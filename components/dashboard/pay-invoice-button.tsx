"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { payInvoiceAction } from "@/app/actions/invoices";

export function PayInvoiceButton({ invoiceId }: { invoiceId: string }) {
  const router = useRouter();
  const [pending, setPending] = React.useState(false);

  async function pay() {
    setPending(true);
    const res = await payInvoiceAction(invoiceId);
    setPending(false);
    if (res.redirectUrl) { window.location.href = res.redirectUrl; return; }
    if (res.ok) router.refresh();
    else alert(res.error);
  }

  return (
    <Button size="sm" variant="gradient" onClick={pay} disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Pay now"}
    </Button>
  );
}
