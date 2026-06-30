/**
 * Argana Media homepage composition. The site chrome (Nav, Footer, cookie
 * banner) now lives in `app/(public)/layout.tsx`, so this file only renders
 * the homepage's own sections in source order.
 */

import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { Services } from "@/components/home/services";
import { WorkflowDiagram } from "@/components/home/workflow-diagram";
import { ServiceIntensive } from "@/components/home/service-intensive";
import { Stats } from "@/components/home/stats";
import { PreFooterCta } from "@/components/home/pre-footer-cta";

export default function PlanhatInspiredHome() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <WorkflowDiagram />
      <ServiceIntensive />
      <Stats />
      <PreFooterCta />
    </>
  );
}
