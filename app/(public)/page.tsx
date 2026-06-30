import type { Metadata } from "next";
import PlanhatInspiredHome from "@/components/marketing/planhat-inspired-home";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Deploy AI with confidence across the customer lifecycle",
  description:
    "Argana Media provides B2B enterprises with forward-deployed software and services that deliver lifelong revenue growth.",
  path: "/",
});

export default function HomePage() {
  return <PlanhatInspiredHome />;
}
