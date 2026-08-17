import Reveal from "@/components/Reveal";
import { publications } from "@/lib/data";

export default function Publications() {
  return (
    <section
      id="research"
      className="border-t border-border bg-surface px-6 py-[100px] md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-[13px] uppercase tracking-[0.3em] text-accent">
            _06. Research
          </p>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-primary md:text-5xl">
            Academic work
          </h2>
          <p className="mt-4 max-w-xl text-text-secondary">
            Research conducted through DANSA Lab, kept separate from applied
            coursework projects above.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-6">
          {publications.map((pub) => (
            <Reveal
              key={pub.id}
              className="rounded-[12px] border border-border bg-background p-8 md:p-10"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-accent/50 px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent">
                  {pub.status}
                </span>
                <span className="font-mono text-sm text-text-secondary">{pub.dates}</span>
              </div>

              <h3 className="mt-5 text-2xl font-semibold leading-snug text-primary md:text-3xl">
                {pub.title}
              </h3>
              <p className="mt-2 font-mono text-sm uppercase tracking-wide text-text-secondary">
                {pub.venue}
              </p>

              <p className="mt-5 max-w-3xl leading-relaxed text-text-secondary">
                {pub.summary}
              </p>

              <div className="mt-8 grid gap-6 border-t border-border pt-6 sm:grid-cols-3">
                {pub.metrics.map((metric) => (
                  <div key={metric.label}>
                    <p className="font-mono text-2xl font-semibold text-primary">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-sm leading-snug text-text-secondary">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

              {pub.links.paper ? (
                <div className="mt-8 flex justify-end">
                  <a
                    data-cursor-hover
                    href={pub.links.paper}
                    target="_blank"
                    rel="noreferrer"
                    className="visible-focus font-mono text-[13px] uppercase tracking-widest text-accent"
                  >
                    Read paper ↗
                  </a>
                </div>
              ) : (
                <div className="mt-8 flex justify-end">
                  <p className="font-mono text-[13px] uppercase tracking-widest text-text-secondary">
                    Preprint link coming on publication
                  </p>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
