import type { Metadata } from "next";
import ArganaLanding from "@/components/marketing/argana-landing";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Digital Media, Marketing & Web Development Agency",
  description:
    "ARGANA MEDIA helps growing businesses build, grow and manage their online presence — content, marketing, websites, design, hosting support and business IT support, from one trusted team across the UK and Europe.",
  path: "/",
});

export default function HomePage() {
  return <ArganaLanding />;
}
