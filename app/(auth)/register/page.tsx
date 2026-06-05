import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/auth/auth-forms";
import { getSession } from "@/lib/auth";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Create account", path: "/register", noIndex: true });

export default async function RegisterPage() {
  if (await getSession()) redirect("/dashboard");
  return <RegisterForm />;
}
