/**
 * Industry tab content for the homepage Service-Intensive band. Each industry
 * supplies a label, hero image (poster) and a customer quote. Clicking a tab
 * swaps the image + testimonial together; the 4-up star reviews below stay
 * static across all tabs.
 *
 * Images are Unsplash workspace/team photography (free licence). Drop licensed
 * photography into `public/industries/*.jpg` and update `image.src` to the
 * local path when ready — see public/industries/README.md.
 */
export type Industry = {
  id: string;
  label: string;
  body: string;
  image: { src: string; alt: string };
  testimonial: { quote: string; author: string; role: string };
};

export const industries: readonly Industry[] = [
  {
    id: "service-intensive",
    label: "Service-Intensive Software",
    body: "Continuously unlock the value your customers need. Argana is a system of action that empowers you to define and track customer objectives, run cross-functional workflows, and report on ROI.",
    image: {
      src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80&auto=format&fit=crop",
      alt: "Team collaborating in a bright meeting room",
    },
    testimonial: {
      quote:
        "We've grown from an initial base of 40 clients to just north of 280 clients that are managed digitally.",
      author: "William Riley",
      role: "Director of Digital Customer Success at Matillion",
    },
  },
  {
    id: "security",
    label: "Security",
    body: "Standardise risk reviews, audit trails and compliance reporting in one place. Argana captures evidence as work happens so reviews stop being a fire drill.",
    image: {
      src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80&auto=format&fit=crop",
      alt: "Security operations centre, monitors glowing in low light",
    },
    testimonial: {
      quote:
        "Argana built our compliance reporting in three weeks. What used to take a quarter now happens on demand.",
      author: "Sarah Chen",
      role: "Head of InfoSec at Vaultline",
    },
  },
  {
    id: "it-services",
    label: "IT Services",
    body: "Stop juggling spreadsheets across ten clients. Argana packages onboarding, renewals and quarterly business reviews into one repeatable, measurable operating system.",
    image: {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&auto=format&fit=crop",
      alt: "Modern office workspace seen through a glass partition",
    },
    testimonial: {
      quote:
        "They standardised our entire client onboarding flow. New engagements now start the same way every time — and we can prove it.",
      author: "James Patel",
      role: "COO at Northwave IT",
    },
  },
  {
    id: "healthcare",
    label: "Healthcare & Life Sciences",
    body: "Move sensitive work out of email and into a system designed for it. Patient portals, study coordination and clinic operations — built to the regulatory bar from day one.",
    image: {
      src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80&auto=format&fit=crop",
      alt: "Clinician reviewing data on a tablet in a healthcare setting",
    },
    testimonial: {
      quote:
        "Argana built our patient portal end-to-end. On time, on spec, and our patients actually use it.",
      author: "Dr. Lina Marsh",
      role: "CMO at Helix Health",
    },
  },
  {
    id: "connected",
    label: "Connected Businesses",
    body: "When your operation lives across stores, sites and partners, one source of truth changes everything. Argana joins the dots so leaders see the whole picture in one place.",
    image: {
      src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1920&q=80&auto=format&fit=crop",
      alt: "Team gathered around a screen reviewing operations data",
    },
    testimonial: {
      quote:
        "Real partners, not vendors. We extended the contract twice — and the results spoke for themselves.",
      author: "Tom Aldridge",
      role: "CEO at Loopwork",
    },
  },
] as const;
