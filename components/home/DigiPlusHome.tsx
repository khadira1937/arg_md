"use client";

import { Header } from "./Header";
import { Hero } from "./hero";
import { Services } from "./services";
import { About } from "./About";
import { Stats } from "./stats";
import { WhyChoose } from "./WhyChoose";
import { WorkShowcase } from "./WorkShowcase";
import { FAQs } from "./FAQs";
import { CTA } from "./CTA";
import { Contact } from "./Contact";
import { Footer } from "./Footer";

/**
 * DigiPlusHome — Main container component for the new homepage.
 * Wraps all sections with the digiplus-page class to ensure DESIGN.md
 * type scales and prefers-reduced-motion guards are applied.
 */

export function DigiPlusHome() {
  return (
    <div
      className="digiplus-page"
      style={{
        backgroundColor: "var(--digiplus-background)",
        color: "var(--digiplus-on-surface)",
      }}
    >
      <Header />
      <Hero />
      <Services />
      <About />
      <Stats />
      <WhyChoose />
      <WorkShowcase />
      <FAQs />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
}
