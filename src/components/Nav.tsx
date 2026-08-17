"use client";

import { profile } from "@/lib/data";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#research", label: "Research" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#top"
          data-cursor-hover
          className="visible-focus font-mono text-sm tracking-tight text-text-primary"
        >
          HP<span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-cursor-hover
                className="visible-focus font-mono text-[13px] uppercase tracking-widest text-text-secondary transition-colors hover:text-text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={`mailto:${profile.email}`}
          data-cursor-hover
          className="visible-focus rounded-full border border-border px-5 py-2 font-mono text-[13px] uppercase tracking-widest text-text-primary transition-colors hover:border-accent hover:text-accent"
        >
          Let&apos;s Talk
        </a>
      </nav>
    </header>
  );
}
