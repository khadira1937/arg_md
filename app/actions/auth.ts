"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { setSessionCookie, clearSessionCookie } from "@/lib/auth/session";
import {
  createVerificationToken,
  consumeVerificationToken,
  createPasswordResetToken,
  consumePasswordResetToken,
} from "@/lib/auth/tokens";
import { mergeGuestCart } from "@/lib/cart";
import { sendEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from "@/lib/validators";
import { absoluteUrl } from "@/lib/utils";

export type AuthState = { error?: string; success?: string } | null;

async function clientIp(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
}

export async function registerAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const ip = await clientIp();
  if (!rateLimit(`register:${ip}`, 5, 60_000).success) return { error: "Too many attempts. Try again shortly." };

  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) return { error: parsed.error.errors[0]?.message ?? "Invalid input" };

  const email = parsed.data.email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "An account with this email already exists." };

  const user = await prisma.user.create({
    data: { email, name: parsed.data.name, hashedPassword: await hashPassword(parsed.data.password), role: "CUSTOMER" },
  });

  const token = await createVerificationToken(email);
  await sendEmail({ to: email, template: { type: "verify_email", name: user.name ?? "there", url: absoluteUrl(`/verify?token=${token}`) } });

  await setSessionCookie({ userId: user.id, email: user.email, role: user.role, name: user.name });
  await mergeGuestCart(user.id);
  redirect("/dashboard");
}

export async function loginAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const ip = await clientIp();
  if (!rateLimit(`login:${ip}`, 10, 60_000).success) return { error: "Too many attempts. Try again shortly." };

  const parsed = loginSchema.safeParse({ email: formData.get("email"), password: formData.get("password") });
  if (!parsed.success) return { error: parsed.error.errors[0]?.message ?? "Invalid input" };

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
  if (!user || !user.hashedPassword || user.isBlocked) return { error: "Invalid email or password." };

  const valid = await verifyPassword(parsed.data.password, user.hashedPassword);
  if (!valid) return { error: "Invalid email or password." };

  await setSessionCookie({ userId: user.id, email: user.email, role: user.role, name: user.name });
  await mergeGuestCart(user.id);
  redirect(user.role === "ADMIN" || user.role === "SUPPORT" ? "/admin" : "/dashboard");
}

export async function logoutAction(): Promise<void> {
  await clearSessionCookie();
  redirect("/");
}

export async function forgotPasswordAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = forgotPasswordSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) return { error: "Enter a valid email." };

  const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
  // Always return success to avoid account enumeration.
  if (user) {
    const token = await createPasswordResetToken(user.id);
    await sendEmail({ to: user.email, template: { type: "reset_password", name: user.name ?? "there", url: absoluteUrl(`/reset-password?token=${token}`) } });
  }
  return { success: "If that email exists, we've sent a reset link." };
}

export async function resetPasswordAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = resetPasswordSchema.safeParse({
    token: formData.get("token"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!parsed.success) return { error: parsed.error.errors[0]?.message ?? "Invalid input" };

  const userId = await consumePasswordResetToken(parsed.data.token);
  if (!userId) return { error: "This reset link is invalid or has expired." };

  await prisma.user.update({ where: { id: userId }, data: { hashedPassword: await hashPassword(parsed.data.password) } });
  return { success: "Password updated. You can now log in." };
}

export async function verifyEmailAction(token: string): Promise<boolean> {
  const identifier = await consumeVerificationToken(token);
  if (!identifier) return false;
  await prisma.user.update({ where: { email: identifier }, data: { emailVerified: new Date() } });
  return true;
}
