import type { Metadata } from "next";
import { DigiPlusHome } from "@/components/home/DigiPlusHome";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "DigiPlus | Your Vision, Our Digital Expertise",
  description:
    "Award-winning digital agency specializing in web design, corporate websites, and digital marketing.",
  path: "/",
});

export default function HomePage() {
  return <DigiPlusHome />;
}
