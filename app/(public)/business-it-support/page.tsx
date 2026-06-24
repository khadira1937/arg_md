import type { Metadata } from "next";
import { ServicePage } from "@/components/marketing/service-page";
import { pageMetadata } from "@/lib/seo";
import { SERVICE_DETAILS } from "@/config/services-content";

const SLUG = "business-it-support";
const detail = SERVICE_DETAILS[SLUG];

export const metadata: Metadata = pageMetadata({
  title: detail.category,
  description: detail.heroSub,
  path: `/${SLUG}`,
});

export default function Page() {
  return <ServicePage slug={SLUG} />;
}
