"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { profile } from "@/lib/data";

export default function Hero() {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (reduced) {
        gsap.set(["[data-hero-eyebrow]", "[data-hero-line]", "[data-hero-sub]", "[data-hero-meta]"], {
          autoAlpha: 1,
          y: 0,
        });
        return;
      }

      tl.fromTo("[data-hero-eyebrow]", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6 })
        .fromTo(
          "[data-hero-line]",
          { autoAlpha: 0, y: 60 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12 },
          "-=0.25"
        )
        .fromTo("[data-hero-sub]", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.4")
        .fromTo(
          "[data-hero-meta]",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 },
          "-=0.35"
        );
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={scope}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-28 md:px-10"
    >
      <div className="relative mx-auto w-full max-w-6xl">
        <p
          data-hero-eyebrow
          className="mb-6 font-mono text-[13px] uppercase tracking-[0.3em] text-accent"
        >
          _01. Portfolio — {profile.location}
        </p>

        <h1 className="text-[13vw] font-semibold leading-[1.1] tracking-tight text-primary sm:text-[10vw] md:text-[7.5vw] lg:text-[88px] pb-4">
          <span data-hero-line className="block pb-2">
            Happy
          </span>
          <span data-hero-line className="block pb-2 text-text-secondary">
            Prajapati
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 border-t border-border pt-8 md:flex-row md:items-end md:justify-between">
          <p data-hero-sub className="max-w-xl text-lg text-text-secondary md:text-xl">
            {profile.role}. Building deep learning pipelines and production
            web applications — from CNN benchmarking to full-stack systems.
          </p>

          <div className="flex gap-8 font-mono text-[13px] uppercase tracking-widest">
            <a
              data-hero-meta
              data-cursor-hover
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="visible-focus text-text-secondary transition-colors hover:text-primary"
            >
              GitHub ↗
            </a>
            <a
              data-hero-meta
              data-cursor-hover
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="visible-focus text-text-secondary transition-colors hover:text-primary"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}