"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { profileSchema } from "@/lib/validators";

export type ProfileState = { error?: string; success?: string } | null;

export async function updateProfileAction(_prev: ProfileState, formData: FormData): Promise<ProfileState> {
  const user = await getCurrentUser();
  if (!user) return { error: "Not authenticated" };

  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    company: formData.get("company") ?? "",
    phone: formData.get("phone") ?? "",
    address: formData.get("address") ?? "",
    city: formData.get("city") ?? "",
    state: formData.get("state") ?? "",
    country: formData.get("country") ?? "",
    postalCode: formData.get("postalCode") ?? "",
    taxId: formData.get("taxId") ?? "",
  });
  if (!parsed.success) return { error: parsed.error.errors[0]?.message ?? "Invalid input" };

  const { name, ...address } = parsed.data;
  await prisma.user.update({ where: { id: user.id }, data: { name } });
  await prisma.userProfile.upsert({ where: { userId: user.id }, update: address, create: { userId: user.id, ...address } });

  revalidatePath("/dashboard/profile");
  return { success: "Profile updated." };
}
