"use client";

import { motion } from "framer-motion";
import { Code2, BrainCircuit, Server, Wrench, FlaskConical, Sparkles, type LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";
import { skillGroups } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  code: Code2,
  brain: BrainCircuit,
  server: Server,
  wrench: Wrench,
  flask: FlaskConical,
  sparkles: Sparkles,
};

export default function Skills() {
  return (
    <section id="skills" className="border-t border-border px-6 py-[100px] md:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-[13px] uppercase tracking-[0.3em] text-accent">
            _03. Stack
          </p>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-primary md:text-5xl">
            Tools I reach for
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, groupIndex) => {
            const Icon = ICONS[group.icon] ?? Code2;
            return (
              <Reveal key={group.label} delay={groupIndex * 0.05}>
                <div className="group h-full rounded-[12px] border border-border bg-surface p-7 transition-colors hover:border-accent/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] border border-border text-accent transition-colors group-hover:border-accent">
                        <Icon size={18} strokeWidth={1.75} />
                      </span>
                      <p className="font-mono text-[13px] uppercase tracking-widest text-text-primary">
                        {group.label}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-text-secondary">
                      {String(group.skills.length).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="rounded-full border border-border px-3.5 py-1.5 text-sm text-text-secondary transition-colors hover:border-accent hover:text-accent"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
