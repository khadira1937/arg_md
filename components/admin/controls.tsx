"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, RefreshCw, Check, X } from "lucide-react";
import type { Role, OrderStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  syncStripeAction, toggleProductFlag, togglePlanFlag, updatePlanPriceAction,
  adminServiceAction, retryJobAction, updateOrderStatusAction, updateUserRoleAction,
  toggleUserBlockedAction, createCouponAction, toggleCouponAction, closeTicketAction,
  type AdminResult,
} from "@/app/actions/admin";

function useRun() {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);
  const run = async (fn: () => Promise<AdminResult>) => {
    setPending(true);
    const res = await fn();
    setPending(false);
    if (!res.ok) alert(res.error);
    else { if (res.message) alert(res.message); router.refresh(); }
  };
  return { pending, run };
}

export function StripeSyncButton() {
  const { pending, run } = useRun();
  return (
    <Button variant="gradient" onClick={() => run(() => syncStripeAction())} disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />} Sync catalog to Stripe
    </Button>
  );
}

export function FlagPill({ on, label, onClick, pending }: { on: boolean; label: string; onClick: () => void; pending?: boolean }) {
  return (
    <button onClick={onClick} disabled={pending} className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${on ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>
      {pending ? <Loader2 className="h-3 w-3 animate-spin" /> : on ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />} {label}
    </button>
  );
}

export function ProductFlag({ productId, field, on, label }: { productId: string; field: "isActive" | "featured" | "inquiryOnly"; on: boolean; label: string }) {
  const { pending, run } = useRun();
  return <FlagPill on={on} label={label} pending={pending} onClick={() => run(() => toggleProductFlag(productId, field))} />;
}

export function PlanFlag({ planId, field, on, label }: { planId: string; field: "isActive" | "popular" | "recommended" | "onSale"; on: boolean; label: string }) {
  const { pending, run } = useRun();
  return <FlagPill on={on} label={label} pending={pending} onClick={() => run(() => togglePlanFlag(planId, field))} />;
}

export function PriceEditForm({ priceId, amount, renewalAmount, discountPercentage }: { priceId: string; amount: number; renewalAmount: number; discountPercentage: number }) {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);
  async function submit(formData: FormData) {
    setPending(true);
    const res = await updatePlanPriceAction(formData);
    setPending(false);
    if (!res.ok) alert(res.error); else router.refresh();
  }
  return (
    <form action={submit} className="flex items-center gap-2">
      <input type="hidden" name="priceId" value={priceId} />
      <Input name="amount" type="number" step="0.01" defaultValue={(amount / 100).toFixed(2)} className="h-8 w-24" />
      <Input name="renewalAmount" type="number" step="0.01" defaultValue={(renewalAmount / 100).toFixed(2)} className="h-8 w-24" />
      <Input name="discountPercentage" type="number" defaultValue={discountPercentage} className="h-8 w-16" />
      <Button type="submit" size="sm" variant="outline" disabled={pending}>{pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}</Button>
    </form>
  );
}

export function ServiceOps({ serviceId, status }: { serviceId: string; status: string }) {
  const { pending, run } = useRun();
  return (
    <div className="flex flex-wrap gap-1.5">
      {status === "ACTIVE" && <Button size="sm" variant="outline" disabled={pending} onClick={() => run(() => adminServiceAction(serviceId, "suspend"))}>Suspend</Button>}
      {status === "SUSPENDED" && <Button size="sm" variant="outline" disabled={pending} onClick={() => run(() => adminServiceAction(serviceId, "resume"))}>Resume</Button>}
      {(status === "PENDING" || status === "FAILED" || status === "PROVISIONING") && <Button size="sm" variant="outline" disabled={pending} onClick={() => run(() => adminServiceAction(serviceId, "activate"))}>Activate</Button>}
      {status !== "CANCELLED" && <Button size="sm" variant="ghost" disabled={pending} onClick={() => run(() => adminServiceAction(serviceId, "cancel"))}>Cancel</Button>}
    </div>
  );
}

export function RetryButton({ jobId }: { jobId: string }) {
  const { pending, run } = useRun();
  return <Button size="sm" variant="outline" disabled={pending} onClick={() => run(() => retryJobAction(jobId))}>{pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Retry"}</Button>;
}

export function OrderStatusSelect({ orderId, status }: { orderId: string; status: OrderStatus }) {
  const { run } = useRun();
  const options: OrderStatus[] = ["PENDING", "PAID", "PROCESSING", "ACTIVE", "CANCELLED", "REFUNDED", "FAILED"];
  return (
    <select defaultValue={status} onChange={(e) => run(() => updateOrderStatusAction(orderId, e.target.value as OrderStatus))} className="h-9 rounded-lg border bg-background px-2 text-sm">
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

export function RoleSelect({ userId, role }: { userId: string; role: Role }) {
  const { run } = useRun();
  const roles: Role[] = ["CUSTOMER", "SUPPORT", "ADMIN"];
  return (
    <select defaultValue={role} onChange={(e) => run(() => updateUserRoleAction(userId, e.target.value as Role))} className="h-9 rounded-lg border bg-background px-2 text-sm">
      {roles.map((r) => <option key={r} value={r}>{r}</option>)}
    </select>
  );
}

export function BlockToggle({ userId, blocked }: { userId: string; blocked: boolean }) {
  const { pending, run } = useRun();
  return <Button size="sm" variant={blocked ? "outline" : "ghost"} disabled={pending} onClick={() => run(() => toggleUserBlockedAction(userId))}>{blocked ? "Unblock" : "Block"}</Button>;
}

export function CouponToggle({ couponId, active }: { couponId: string; active: boolean }) {
  const { pending, run } = useRun();
  return <Button size="sm" variant="outline" disabled={pending} onClick={() => run(() => toggleCouponAction(couponId))}>{active ? "Disable" : "Enable"}</Button>;
}

export function CloseTicketButton({ ticketId }: { ticketId: string }) {
  const { pending, run } = useRun();
  return <Button size="sm" variant="outline" disabled={pending} onClick={() => run(() => closeTicketAction(ticketId))}>Close ticket</Button>;
}

export function NewCouponForm() {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);
  async function submit(formData: FormData) {
    setPending(true);
    const res = await createCouponAction(formData);
    setPending(false);
    if (!res.ok) alert(res.error); else { router.refresh(); }
  }
  return (
    <form action={submit} className="flex flex-wrap items-end gap-3">
      <div><label className="mb-1 block text-xs text-muted-foreground">Code</label><Input name="code" placeholder="SAVE10" className="h-9 w-32" /></div>
      <div><label className="mb-1 block text-xs text-muted-foreground">Type</label><select name="type" className="h-9 rounded-lg border bg-background px-2 text-sm"><option value="PERCENT">Percent</option><option value="FIXED">Fixed $</option></select></div>
      <div><label className="mb-1 block text-xs text-muted-foreground">Value</label><Input name="value" type="number" step="0.01" defaultValue={10} className="h-9 w-24" /></div>
      <div><label className="mb-1 block text-xs text-muted-foreground">Per-user limit</label><Input name="perUserLimit" type="number" defaultValue={1} className="h-9 w-20" /></div>
      <Button type="submit" variant="gradient" disabled={pending}>{pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create coupon"}</Button>
    </form>
  );
}
