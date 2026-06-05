import "server-only";
import crypto from "node:crypto";
import { prisma } from "@/lib/db";

const VERIFY_TTL_HOURS = 24;
const RESET_TTL_HOURS = 1;

function randomToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/** Create an email-verification token for an identifier (email). */
export async function createVerificationToken(identifier: string): Promise<string> {
  const token = randomToken();
  const expires = new Date(Date.now() + VERIFY_TTL_HOURS * 3600 * 1000);
  await prisma.verificationToken.create({ data: { identifier, token, expires } });
  return token;
}

export async function consumeVerificationToken(token: string): Promise<string | null> {
  const record = await prisma.verificationToken.findUnique({ where: { token } });
  if (!record || record.expires < new Date()) return null;
  await prisma.verificationToken.deleteMany({ where: { token } });
  return record.identifier;
}

/** Create a password-reset token bound to a user. */
export async function createPasswordResetToken(userId: string): Promise<string> {
  const token = randomToken();
  const expires = new Date(Date.now() + RESET_TTL_HOURS * 3600 * 1000);
  await prisma.passwordResetToken.create({ data: { userId, token, expires } });
  return token;
}

export async function consumePasswordResetToken(token: string): Promise<string | null> {
  const record = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!record || record.usedAt || record.expires < new Date()) return null;
  await prisma.passwordResetToken.update({
    where: { id: record.id },
    data: { usedAt: new Date() },
  });
  return record.userId;
}
