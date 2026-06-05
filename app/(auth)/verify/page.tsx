import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { verifyEmailAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Verify email", path: "/verify", noIndex: true });

export default async function VerifyPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  const ok = token ? await verifyEmailAction(token) : false;

  return (
    <div className="text-center">
      {ok ? (
        <>
          <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
          <h1 className="mt-4 text-xl font-bold">Email verified</h1>
          <p className="mt-2 text-sm text-muted-foreground">Your email address is confirmed. You're all set.</p>
          <Button asChild variant="gradient" className="mt-6"><Link href="/dashboard">Go to dashboard</Link></Button>
        </>
      ) : (
        <>
          <XCircle className="mx-auto h-12 w-12 text-destructive" />
          <h1 className="mt-4 text-xl font-bold">Verification failed</h1>
          <p className="mt-2 text-sm text-muted-foreground">This link is invalid or has expired.</p>
          <Button asChild variant="outline" className="mt-6"><Link href="/dashboard">Back to dashboard</Link></Button>
        </>
      )}
    </div>
  );
}
