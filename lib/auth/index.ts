import "server-only";
import { redirect } from "next/navigation";
import type { Role } from "@prisma/client";
import { prisma } from "@/lib/db";
import { hasRole, isStaff } from "@/lib/permissions";
import { readSession, type SessionPayload } from "./session";

export type { SessionPayload };
export * from "./session";
export * from "./password";

/** Lightweight session read (no DB hit) — for layouts/guards. */
export async function getSession(): Promise<SessionPayload | null> {
  return readSession();
}

/** Full user record from the DB for the current session, or null. */
export async function getCurrentUser() {
  const session = await readSession();
  if (!session) return null;
  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { profile: true },
  });
  if (!user || user.isBlocked) return null;
  return user;
}

/** Require any authenticated user; redirect to login otherwise. */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

/** Require a minimum role; redirect if unauthorized. */
export async function requireRole(required: Role) {
  const user = await requireUser();
  if (!hasRole(user.role, required)) redirect("/dashboard");
  return user;
}

/** Require admin or support staff. */
export async function requireStaff() {
  const user = await requireUser();
  if (!isStaff(user.role)) redirect("/dashboard");
  return user;
}
