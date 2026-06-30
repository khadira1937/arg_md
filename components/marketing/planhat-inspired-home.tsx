/**
 * Argana Media homepage (new design, derived from `code.html` + DESIGN.md).
 *
 * Composes the eight homepage sections in source order. Everything sits inside
 * `.am-home` so the page's Hanken Grotesk + monochrome + burnt-orange palette
 * never leaks into the rest of the site, which keeps its dark teal/gold theme.
 *
 * The file name is preserved to avoid touching unrelated imports — this is
 * the only thing the previous planhat-inspired component is used for.
 */

import { Nav } from "@/components/home/nav";
import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { Services } from "@/components/home/services";
import { WorkflowDiagram } from "@/components/home/workflow-diagram";
import { ServiceIntensive } from "@/components/home/service-intensive";
import { Stats } from "@/components/home/stats";
import { Footer } from "@/components/home/footer";

export default function PlanhatInspiredHome() {
  return (
    <div className="am-home font-hanken">
      <Nav />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Services />
        <WorkflowDiagram />
        <ServiceIntensive />
        <Stats />
      </main>
      <Footer />
    </div>
  );
}
