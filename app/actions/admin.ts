"use server";

import { revalidatePath } from "next/cache";
import type { Role, OrderStatus } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { isStaff, isAdmin } from "@/lib/permissions";
import { audit } from "@/lib/audit";
import { syncCatalogToStripe } from "@/lib/stripe/sync";
import { enqueueJob, processPendingJobs } from "@/lib/provisioning";
import { sendEmail } from "@/lib/email";
import { shortId } from "@/lib/utils";

export type AdminResult = { ok: boolean; error?: string; message?: string };

async function guard(adminOnly = false): Promise<{ id: string } | { error: string }> {
  const user = await getCurrentUser();
  if (!user || !isStaff(user.role)) return { error: "Unauthorized" };
  if (adminOnly && !isAdmin(user.role)) return { error: "Admin role required" };
  return { id: user.id };
}

// ---- Stripe sync ----
export async function syncStripeAction(): Promise<AdminResult> {
  const g = await guard(true);
  if ("error" in g) return { ok: false, error: g.error };
  const report = await syncCatalogToStripe();
  await audit({ actorId: g.id, action: "stripe.sync", metadata: { ...report } });
  revalidatePath("/admin/stripe");
  return { ok: true, message: `Synced ${report.productsSynced} products and ${report.pricesSynced} prices (${report.placeholder ? "placeholder" : "live"} mode).` };
}

// ---- Catalog toggles ----
export async function toggleProductFlag(productId: string, field: "isActive" | "featured" | "inquiryOnly"): Promise<AdminResult> {
  const g = await guard(true);
  if ("error" in g) return { ok: false, error: g.error };
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) return { ok: false, error: "Not found" };
  await prisma.product.update({ where: { id: productId }, data: { [field]: !product[field] } });
  await audit({ actorId: g.id, action: `product.${field}`, entityType: "Product", entityId: productId, metadata: { value: !product[field] } });
  revalidatePath("/admin/products");
  return { ok: true };
}

export async function togglePlanFlag(planId: string, field: "isActive" | "popular" | "recommended" | "onSale"): Promise<AdminResult> {
  const g = await guard(true);
  if ("error" in g) return { ok: false, error: g.error };
  const plan = await prisma.plan.findUnique({ where: { id: planId } });
  if (!plan) return { ok: false, error: "Not found" };
  await prisma.plan.update({ where: { id: planId }, data: { [field]: !plan[field] } });
  await audit({ actorId: g.id, action: `plan.${field}`, entityType: "Plan", entityId: planId });
  revalidatePath("/admin/pricing");
  return { ok: true };
}

export async function updatePlanPriceAction(formData: FormData): Promise<AdminResult> {
  const g = await guard(true);
  if ("error" in g) return { ok: false, error: g.error };
  const id = String(formData.get("priceId"));
  const amount = Math.round(Number(formData.get("amount")) * 100);
  const renewalAmount = Math.round(Number(formData.get("renewalAmount")) * 100);
  const discountPercentage = Math.max(0, Math.min(100, Number(formData.get("discountPercentage")) || 0));
  if (!id || Number.isNaN(amount) || Number.isNaN(renewalAmount)) return { ok: false, error: "Invalid values" };
  await prisma.planPrice.update({ where: { id }, data: { amount, renewalAmount, discountPercentage } });
  await audit({ actorId: g.id, action: "planPrice.update", entityType: "PlanPrice", entityId: id, metadata: { amount, renewalAmount } });
  revalidatePath("/admin/pricing");
  return { ok: true, message: "Price updated." };
}

// ---- Service lifecycle ----
export async function adminServiceAction(serviceId: string, op: "suspend" | "resume" | "cancel" | "activate"): Promise<AdminResult> {
  const g = await guard();
  if ("error" in g) return { ok: false, error: g.error };
  const service = await prisma.serviceInstance.findUnique({ where: { id: serviceId }, include: { user: true } });
  if (!service) return { ok: false, error: "Not found" };

  const statusMap = { suspend: "SUSPENDED", resume: "ACTIVE", cancel: "CANCELLED", activate: "ACTIVE" } as const;
  await prisma.serviceInstance.update({
    where: { id: serviceId },
    data: {
      status: statusMap[op],
      suspendedAt: op === "suspend" ? new Date() : op === "resume" ? null : undefined,
      cancelledAt: op === "cancel" ? new Date() : undefined,
    },
  });
  if (op !== "activate") await enqueueJob(serviceId, op === "suspend" ? "SUSPEND" : op === "resume" ? "RESUME" : "CANCEL");
  await processPendingJobs();

  if (op === "suspend") await sendEmail({ to: service.user.email, template: { type: "service_suspended", name: service.user.name ?? "there", serviceLabel: service.label } });
  await audit({ actorId: g.id, action: `service.${op}`, entityType: "ServiceInstance", entityId: serviceId });
  revalidatePath("/admin/services");
  return { ok: true };
}

export async function retryJobAction(jobId: string): Promise<AdminResult> {
  const g = await guard();
  if ("error" in g) return { ok: false, error: g.error };
  await prisma.provisioningJob.update({ where: { id: jobId }, data: { status: "QUEUED", lastError: null } });
  await processPendingJobs();
  await audit({ actorId: g.id, action: "job.retry", entityType: "ProvisioningJob", entityId: jobId });
  revalidatePath("/admin/provisioning");
  return { ok: true };
}

// ---- Orders ----
export async function updateOrderStatusAction(orderId: string, status: OrderStatus): Promise<AdminResult> {
  const g = await guard();
  if ("error" in g) return { ok: false, error: g.error };
  await prisma.order.update({ where: { id: orderId }, data: { status } });
  await audit({ actorId: g.id, action: "order.status", entityType: "Order", entityId: orderId, metadata: { status } });
  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");
  return { ok: true };
}

// ---- Users ----
export async function updateUserRoleAction(userId: string, role: Role): Promise<AdminResult> {
  const g = await guard(true);
  if ("error" in g) return { ok: false, error: g.error };
  if (userId === g.id) return { ok: false, error: "You can't change your own role." };
  await prisma.user.update({ where: { id: userId }, data: { role } });
  await audit({ actorId: g.id, action: "user.role", entityType: "User", entityId: userId, metadata: { role } });
  revalidatePath("/admin/users");
  return { ok: true };
}

export async function toggleUserBlockedAction(userId: string): Promise<AdminResult> {
  const g = await guard(true);
  if ("error" in g) return { ok: false, error: g.error };
  if (userId === g.id) return { ok: false, error: "You can't block yourself." };
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return { ok: false, error: "Not found" };
  await prisma.user.update({ where: { id: userId }, data: { isBlocked: !user.isBlocked } });
  await audit({ actorId: g.id, action: "user.blocked", entityType: "User", entityId: userId, metadata: { blocked: !user.isBlocked } });
  revalidatePath("/admin/users");
  return { ok: true };
}

// ---- Coupons ----
export async function createCouponAction(formData: FormData): Promise<AdminResult> {
  const g = await guard(true);
  if ("error" in g) return { ok: false, error: g.error };
  const code = String(formData.get("code") || "").toUpperCase().trim() || `SAVE-${shortId(4)}`;
  const type = formData.get("type") === "FIXED" ? "FIXED" : "PERCENT";
  const value = Number(formData.get("value")) || 0;
  if (value <= 0) return { ok: false, error: "Value must be positive." };
  try {
    await prisma.coupon.create({
      data: { code, type, value: type === "FIXED" ? Math.round(value * 100) : value, perUserLimit: Number(formData.get("perUserLimit")) || 1, isActive: true },
    });
  } catch {
    return { ok: false, error: "Coupon code already exists." };
  }
  await audit({ actorId: g.id, action: "coupon.create", metadata: { code } });
  revalidatePath("/admin/coupons");
  return { ok: true, message: `Coupon ${code} created.` };
}

export async function toggleCouponAction(couponId: string): Promise<AdminResult> {
  const g = await guard(true);
  if ("error" in g) return { ok: false, error: g.error };
  const coupon = await prisma.coupon.findUnique({ where: { id: couponId } });
  if (!coupon) return { ok: false, error: "Not found" };
  await prisma.coupon.update({ where: { id: couponId }, data: { isActive: !coupon.isActive } });
  revalidatePath("/admin/coupons");
  return { ok: true };
}

// ---- Tickets ----
export async function closeTicketAction(ticketId: string): Promise<AdminResult> {
  const g = await guard();
  if ("error" in g) return { ok: false, error: g.error };
  await prisma.supportTicket.update({ where: { id: ticketId }, data: { status: "CLOSED" } });
  await audit({ actorId: g.id, action: "ticket.close", entityType: "SupportTicket", entityId: ticketId });
  revalidatePath(`/admin/tickets/${ticketId}`);
  return { ok: true };
}
