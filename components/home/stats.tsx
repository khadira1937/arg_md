import { stats } from "@/data/home";
import { FadeUp } from "./fade-up";

/**
 * Dark "Don't buy hypotheticals. Buy outcomes." stats band. Four tabular-num
 * figures laid out as a 1-pixel hairline grid (border: rgba(255,255,255,0.08)
 * separators read as gridlines on the black background).
 */
export function Stats() {
  return (
    <section id="services" className="am-band-dark am-section border-t border-white/10">
      <div className="am-container">
        <FadeUp className="mx-auto mb-20 max-w-2xl text-center">
          <p className="am-label-caps text-white/60">{stats.eyebrow}</p>
          <h2 className="am-headline-md mt-5 text-white">
            {stats.heading[0]}
            <br />
            {stats.heading[1]}
          </h2>
          <p className="am-body-lg mt-6 text-white/70">{stats.body}</p>
        </FadeUp>

        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {stats.items.map((item, i) => (
            <FadeUp as="li" key={item.label} index={i + 1} className="bg-black p-12 sm:p-16">
              <div className="tnum text-6xl font-bold tracking-tighter sm:text-7xl">{item.value}</div>
              <p className="am-label-caps mt-6 text-white/50">{item.label}</p>
            </FadeUp>
          ))}
        </ul>
      </div>
    </section>
  );
}
