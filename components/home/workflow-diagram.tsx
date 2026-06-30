import { workflow } from "@/data/home";
import { FadeUp } from "./fade-up";

/**
 * Dark "Platform" band. Hub-and-spoke radial layout — the central ARGANA
 * ENGINE pulse with six labelled nodes (CONTEXT, TRAINING, INPUT,
 * COLLABORATION, AGENTS, EXECUTION) placed around it, plus a bottom-right
 * context info box. Per DESIGN.md the only ring/pulse animation respects
 * prefers-reduced-motion (handled in globals.css).
 *
 * Layout uses an absolute-positioned 2D grid (not SVG paths) so it stays
 * crisp at every viewport without re-projecting math.
 */
export function WorkflowDiagram() {
  return (
    <section id="platform" className="am-band-dark am-section border-t border-white/10">
      <div className="am-container">
        <FadeUp className="mx-auto mb-20 max-w-3xl text-center">
          <p className="am-label-caps text-white/60">{workflow.eyebrow}</p>
          <h2 className="am-headline-md mt-5 text-white">{workflow.heading}</h2>
          <p className="am-body-lg mt-6 text-white/70">{workflow.body}</p>
        </FadeUp>

        <FadeUp index={1}>
          <div className="relative mx-auto h-[560px] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent sm:h-[600px]">
            {/* Top label */}
            <div className="absolute left-1/2 top-10 flex -translate-x-1/2 flex-col items-center">
              <span className="am-label-caps text-white/55">{workflow.nodes[0]}</span>
              <span aria-hidden className="mt-3 block h-3 w-3 rounded-full border-4 border-white/15 bg-white" />
            </div>

            {/* Top-row labels */}
            <div className="absolute left-10 top-24 flex items-center gap-2 sm:left-20">
              <span className="am-label-caps text-white/55">{workflow.nodes[1]}</span>
              <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-white/40" />
            </div>
            <div className="absolute right-10 top-24 flex items-center gap-2 sm:right-20">
              <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-white/40" />
              <span className="am-label-caps text-white/55">{workflow.nodes[2]}</span>
            </div>

            {/* Central hub */}
            <div className="absolute left-1/2 top-1/2 flex h-48 w-48 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <span aria-hidden className="am-engine-pulse absolute inset-0 rounded-full border border-white/20" />
              <span aria-hidden className="absolute inset-4 rounded-full border border-white/10" />
              <span aria-hidden className="absolute inset-8 rounded-full border border-white/5" />
              <span className="am-label-caps relative z-10 rounded-md border border-white/20 bg-black px-4 py-2 text-white">
                {workflow.hubLabel}
              </span>
            </div>

            {/* Bottom-row labels */}
            <div className="absolute bottom-32 left-10 flex items-center gap-2 sm:left-20">
              <span className="am-label-caps text-white/55">{workflow.nodes[3]}</span>
              <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-white/40" />
            </div>
            <div className="absolute bottom-32 right-10 flex items-center gap-2 sm:right-20">
              <span aria-hidden className="block h-1.5 w-1.5 rounded-full bg-white/40" />
              <span className="am-label-caps text-white/55">{workflow.nodes[4]}</span>
            </div>

            {/* Bottom label */}
            <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center">
              <span aria-hidden className="mb-3 inline-block h-2 w-2 -rotate-45 border-b border-l border-white/40" />
              <span className="am-label-caps text-white/55">{workflow.nodes[5]}</span>
            </div>

            {/* Context info box */}
            <aside className="absolute bottom-8 right-6 max-w-[280px] rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm sm:bottom-12 sm:right-12">
              <p className="am-label-caps text-white/50">{workflow.contextBox.label}</p>
              <p className="mt-3 text-[12.5px] leading-relaxed text-white/75">
                {workflow.contextBox.body}
              </p>
            </aside>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
