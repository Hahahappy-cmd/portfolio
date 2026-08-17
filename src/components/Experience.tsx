import Reveal from "@/components/Reveal";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="border-t border-border px-6 py-[100px] md:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-[13px] uppercase tracking-[0.3em] text-accent">
            _04. Experience
          </p>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-primary md:text-5xl">
            Where I&apos;ve worked
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col">
          {experience.map((job) => (
            <Reveal
              key={job.org}
              className="grid grid-cols-1 gap-4 border-t border-border py-10 md:grid-cols-[200px_1fr]"
            >
              <div>
                <p className="font-mono text-sm text-text-secondary">{job.dates}</p>
                <p className="mt-1 text-sm text-text-secondary">{job.location}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary md:text-2xl">
                  {job.role}
                </h3>
                <p className="mt-1 font-mono text-sm uppercase tracking-wide text-accent">
                  {job.org}
                </p>
                <ul className="mt-5 flex flex-col gap-3">
                  {job.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-text-secondary leading-relaxed"
                    >
                      <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-text-secondary" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
