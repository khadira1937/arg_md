/**
 * Argana Media homepage (new design, derived from `code.html` + DESIGN.md).
 *
 * Composes the homepage sections in source order. Everything except the shared
 * marketing footer sits inside `.am-home` so the Hanken Grotesk + monochrome +
 * burnt-orange palette never leaks into the rest of the site (which keeps its
 * dark teal/gold theme). The footer is the shared site footer so the page
 * ends the same way as every other public route.
 *
 * Cookie consent is a fixed-bottom banner mounted outside `.am-home` so it
 * persists across scroll and never overlaps the hero CTAs.
 */

import { Nav } from "@/components/home/nav";
import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { Services } from "@/components/home/services";
import { WorkflowDiagram } from "@/components/home/workflow-diagram";
import { ServiceIntensive } from "@/components/home/service-intensive";
import { Stats } from "@/components/home/stats";
import { ForwardDeployed } from "@/components/home/forward-deployed";
import { PreFooterCta } from "@/components/home/pre-footer-cta";
import { CookieBanner } from "@/components/home/cookie-banner";
import { Footer } from "@/components/marketing/footer";

export default function PlanhatInspiredHome() {
  return (
    <>
      <div className="am-home font-hanken">
        <Nav />
        <main id="main">
          <Hero />
          <TrustStrip />
          <Services />
          <WorkflowDiagram />
          <ServiceIntensive />
          <Stats />
          <ForwardDeployed />
          <PreFooterCta />
        </main>
      </div>
      <Footer />
      <CookieBanner />
    </>
  );
}
