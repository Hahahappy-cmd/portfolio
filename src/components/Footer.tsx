import Reveal from "@/components/Reveal";
import { profile, achievements } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-[100px] md:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-mono text-[13px] uppercase tracking-[0.3em] text-accent">
            _07. Contact
          </p>
          <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight text-primary md:text-6xl">
            Let&apos;s build something.
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a
              data-cursor-hover
              href={`mailto:${profile.email}`}
              className="visible-focus font-mono text-lg text-text-primary underline decoration-border underline-offset-8 transition-colors hover:text-accent hover:decoration-accent"
            >
              {profile.email}
            </a>
            <a
              data-cursor-hover
              href={profile.resumeUrl}
              download
              className="visible-focus inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-mono text-[13px] uppercase tracking-widest text-text-primary transition-colors hover:border-accent hover:text-accent"
            >
              Download Resume ↓
            </a>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-10 border-t border-border pt-10 md:grid-cols-2">
          <Reveal>
            <p className="font-mono text-[13px] uppercase tracking-widest text-text-secondary">
              Achievements
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {achievements.map((a) => (
                <li key={a.title} className="text-text-primary">
                  {a.title}{" "}
                  <span className="text-text-secondary">
                    — {a.org}, {a.year}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <p className="font-mono text-[13px] uppercase tracking-widest text-text-secondary">
              Elsewhere
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <a
                data-cursor-hover
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="visible-focus w-fit text-text-primary transition-colors hover:text-accent"
              >
                GitHub — Hahahappy-cmd
              </a>
              <a
                data-cursor-hover
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="visible-focus w-fit text-text-primary transition-colors hover:text-accent"
              >
                LinkedIn
              </a>
              <span className="text-text-secondary">{profile.phone}</span>
              <span className="text-text-secondary">{profile.location}</span>
            </div>
          </Reveal>
        </div>

        <p className="mt-16 font-mono text-xs text-text-secondary">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, TypeScript & GSAP.
        </p>
      </div>
    </footer>
  );
}
