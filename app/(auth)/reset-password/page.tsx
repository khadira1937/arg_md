import type { Metadata } from "next";
import Link from "next/link";
import { ResetPasswordForm } from "@/components/auth/auth-forms";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Reset password", path: "/reset-password", noIndex: true });

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  if (!token) {
    return (
      <div className="text-center">
        <h1 className="text-xl font-bold">Invalid reset link</h1>
        <p className="mt-2 text-sm text-muted-foreground">This link is missing a token.</p>
        <Link href="/forgot-password" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">Request a new link</Link>
      </div>
    );
  }
  return <ResetPasswordForm token={token} />;
}
