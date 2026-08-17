"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/data";

export default function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, projects.length - 1));
    const slide = track.children[clamped] as HTMLElement | undefined;
    if (slide) {
      track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const children = Array.from(track.children) as HTMLElement[];
        const center = track.scrollLeft + track.clientWidth / 2;
        let closest = 0;
        let closestDist = Infinity;
        children.forEach((child, i) => {
          const childCenter = child.offsetLeft - track.offsetLeft + child.clientWidth / 2;
          const dist = Math.abs(childCenter - center);
          if (dist < closestDist) {
            closestDist = dist;
            closest = i;
          }
        });
        setActive(closest);
        ticking = false;
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (e.key === "ArrowRight") scrollToIndex(active + 1);
      if (e.key === "ArrowLeft") scrollToIndex(active - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="projects" className="border-t border-border px-6 py-[100px] md:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[13px] uppercase tracking-[0.3em] text-accent">
              _05. Selected Projects
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-primary md:text-5xl">
              Applied engineering
            </h2>
            <p className="mt-4 max-w-xl text-text-secondary">
              Case studies from coursework and team initiatives — architecture,
              ownership, and measurable outcomes for each.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <NavButton direction="prev" onClick={() => scrollToIndex(active - 1)} disabled={active === 0} />
            <NavButton
              direction="next"
              onClick={() => scrollToIndex(active + 1)}
              disabled={active === projects.length - 1}
            />
          </div>
        </Reveal>

        <div
          ref={trackRef}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project) => (
            <article
              key={project.id}
              className="w-full shrink-0 snap-center rounded-[12px] border border-border bg-surface p-8 transition-colors hover:border-accent/50 sm:w-[92%] md:p-10 lg:w-[85%]"
            >
              <div className="grid grid-cols-1 gap-10 md:grid-cols-[80px_1fr]">
                <span className="font-mono text-2xl text-text-secondary">
                  _{project.number}
                </span>

                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                    <h3 className="text-2xl font-semibold text-primary md:text-3xl">
                      {project.name}
                    </h3>
                    <span className="font-mono text-sm text-text-secondary">
                      {project.dates}
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-sm uppercase tracking-wide text-accent">
                    {project.course} · {project.team}
                  </p>

                  <p className="mt-5 max-w-3xl leading-relaxed text-text-secondary">
                    {project.summary}
                  </p>

                  <div className="mt-8 grid gap-8 md:grid-cols-2">
                    <div>
                      <p className="font-mono text-[13px] uppercase tracking-widest text-text-secondary">
                        Architecture
                      </p>
                      <ul className="mt-3 flex flex-col gap-2.5">
                        {project.architecture.map((line) => (
                          <li key={line} className="flex gap-3 text-sm leading-relaxed text-text-primary">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="font-mono text-[13px] uppercase tracking-widest text-text-secondary">
                        Metrics
                      </p>
                      <div className="mt-3 flex flex-col gap-3">
                        {project.metrics.map((metric) => (
                          <div key={metric.label}>
                            <span className="font-mono text-lg font-semibold text-primary">
                              {metric.value}
                            </span>{" "}
                            <span className="text-sm text-text-secondary">{metric.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-3 py-1 font-mono text-xs uppercase tracking-wide text-text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-5 font-mono text-[13px] uppercase tracking-widest">
                      {project.links.live && (
                        <a
                          data-cursor-hover
                          href={project.links.live}
                          target="_blank"
                          rel="noreferrer"
                          className="visible-focus text-text-secondary transition-colors hover:text-primary"
                        >
                          Live ↗
                        </a>
                      )}
                      <a
                        data-cursor-hover
                        href={project.links.repo.url}
                        target="_blank"
                        rel="noreferrer"
                        className="visible-focus text-text-secondary transition-colors hover:text-primary"
                      >
                        {project.links.repo.label} ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {projects.map((project, i) => (
            <button
              key={project.id}
              data-cursor-hover
              aria-label={`Go to ${project.name}`}
              onClick={() => scrollToIndex(i)}
              className="visible-focus rounded-full p-1.5"
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  active === i ? "w-6 bg-accent" : "w-1.5 bg-border"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function NavButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <motion.button
      data-cursor-hover
      aria-label={direction === "prev" ? "Previous project" : "Next project"}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.08 }}
      whileTap={disabled ? undefined : { scale: 0.94 }}
      className="visible-focus flex h-11 w-11 items-center justify-center rounded-full border border-border text-text-primary transition-colors disabled:cursor-not-allowed disabled:opacity-30 hover:enabled:border-accent hover:enabled:text-accent"
    >
      {direction === "prev" ? "←" : "→"}
    </motion.button>
  );
}
