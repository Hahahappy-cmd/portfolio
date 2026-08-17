import Reveal from "@/components/Reveal";
import { stats, education } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="border-t border-border px-6 py-[100px] md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-24">
          <Reveal>
            <p className="font-mono text-[13px] uppercase tracking-[0.3em] text-accent">
              _02. About
            </p>
          </Reveal>

          <div className="flex flex-col gap-10">
            <Reveal>
              <p className="text-2xl leading-relaxed text-text-primary md:text-3xl">
                I&apos;m a Computer Science student at the University of Calgary,
                splitting my time between deep learning research and
                production software engineering. I care about pipelines that
                hold up under real data, and interfaces that get out of the
                user&apos;s way.
              </p>
            </Reveal>

            <Reveal stagger={0.1} className="flex flex-col gap-4">
              {education.map((edu) => (
                <div
                  key={edu.school}
                  className="rounded-[12px] border border-border bg-surface p-8"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <p className="font-mono text-[13px] uppercase tracking-widest text-text-secondary">
                      Education
                    </p>
                    <p className="font-mono text-sm text-text-secondary">{edu.dates}</p>
                  </div>
                  <p className="mt-3 text-lg text-text-primary">{edu.degree}</p>
                  <p className="text-text-secondary">{edu.school}</p>
                  {edu.details.length > 0 && (
                    <p className="mt-1 text-sm text-text-secondary">
                      {edu.details.join(" · ")}
                    </p>
                  )}
                </div>
              ))}
            </Reveal>

            <Reveal stagger={0.1} className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[12px] border border-border p-5 md:p-6"
                >
                  <p className="font-mono text-2xl font-semibold leading-tight text-primary md:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm leading-snug text-text-secondary">
                    {stat.label}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
