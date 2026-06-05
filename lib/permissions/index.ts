import type { Role } from "@prisma/client";

/** Role hierarchy for simple comparisons. */
export const ROLE_RANK: Record<Role, number> = {
  CUSTOMER: 0,
  SUPPORT: 1,
  ADMIN: 2,
};

export function hasRole(role: Role | undefined, required: Role): boolean {
  if (!role) return false;
  return ROLE_RANK[role] >= ROLE_RANK[required];
}

export function isStaff(role: Role | undefined): boolean {
  return role === "ADMIN" || role === "SUPPORT";
}

export function isAdmin(role: Role | undefined): boolean {
  return role === "ADMIN";
}

/** Coarse-grained capability matrix used in admin UI gating. */
export type Capability =
  | "manage_users"
  | "manage_catalog"
  | "manage_pricing"
  | "manage_orders"
  | "manage_billing"
  | "manage_services"
  | "manage_tickets"
  | "manage_content"
  | "view_audit_logs"
  | "sync_stripe";

const CAPABILITIES: Record<Role, Capability[]> = {
  CUSTOMER: [],
  SUPPORT: ["manage_orders", "manage_services", "manage_tickets", "manage_content"],
  ADMIN: [
    "manage_users",
    "manage_catalog",
    "manage_pricing",
    "manage_orders",
    "manage_billing",
    "manage_services",
    "manage_tickets",
    "manage_content",
    "view_audit_logs",
    "sync_stripe",
  ],
};

export function can(role: Role | undefined, capability: Capability): boolean {
  if (!role) return false;
  return CAPABILITIES[role].includes(capability);
}
