# Happy Prajapati — Portfolio

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, GSAP (ScrollTrigger), and Framer Motion, per `DESIGN.md`.

## Getting started

You need [Node.js](https://nodejs.org) 18.18+ installed first.

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser. Reload the page to see the
intro animation (name reveal + panel wipe) — it only plays on a full
page load, not on every scroll.

## What's new in this version

- **Reload intro animation** (`src/components/Preloader.tsx`) — full-screen
  name reveal followed by a staggered panel wipe, in the style of the
  reference site. Skips automatically for users with reduced-motion enabled.
- **Project carousel** (`src/components/Projects.tsx`) — swipeable/scroll-snap
  slider with arrow buttons, dot indicators, and keyboard arrow-key support.
  Add as many entries to the `projects` array in `data.ts` as you like — the
  section height never grows.
- **Space background** (`src/components/SpaceBackground.tsx`) — canvas
  starfield with twinkling stars and occasional shooting stars, sitting behind
  all page content. Pauses when the tab isn't visible and respects
  reduced-motion.

## Structure

- `src/lib/data.ts` — **all content lives here**, sourced from the resume. Edit this file to update copy, stats, project details, or links.
- `src/components/` — one component per section (Preloader, SpaceBackground, Hero, About, Skills, Experience, Projects, Publications, Footer, Nav, CustomCursor, Reveal).
- `src/app/globals.css` — design tokens (`@theme` block) mapped 1:1 from `DESIGN.md`.

## TODO before shipping

Search `data.ts` for `TODO` — these are placeholder links:
- GitHub/GitLab links for each project (Compiler, OMG, TrustBuy — add more entries to the array anytime)
- GitLab profile URL (source resume had a typo in the URL)
- Preprint/DOI link for the DANSA Lab research once published

## Deploying

Push to GitHub and import into Vercel — zero config needed, it's a standard Next.js app.

## Latest updates

- Added University of Ottawa (Sept 2023 – Apr 2024) as a second education entry in `data.ts` — `About.tsx` now maps over an array instead of a single object.
- Fixed the stat-card overflow (96.8% wasn't fitting) with responsive font sizing and a 2-col → 4-col grid breakpoint.
- Re-sorted `skillGroups` into 6 categories (split "Tools & DevOps" out from Backend/Testing) and gave `Skills.tsx` icons, hover-lift pills, and a per-category count.
- Added the LibraTech project to the carousel.
- Updated the research paper title in `data.ts`; the "coming soon" link now sits bottom-right in `Publications.tsx`.
- Added a "Download Resume" button in `Footer.tsx`, pointing at `public/Happy-Prajapati-Resume.pdf` (converted from your uploaded .docx — swap the file if you update your resume later, just keep the same filename or update `profile.resumeUrl` in `data.ts`).
- Fixed your GitLab URL in `data.ts` (your new resume already has it typo-free).

## Latest updates (round 3)

- Added "This Portfolio" as a 5th project in `data.ts` — repo link is a placeholder (`#`) until you push it to GitHub, then swap `links.repo.url` in the `portfolio` entry.
- Restructured `project.links` in `data.ts`: each project now has a single `repo` link (with a `label` of `"GitHub"` or `"GitLab"`) instead of separate github/gitlab fields, plus an optional `live` link. `Projects.tsx` was updated to render only the one repo button, with a "Live ↗" button appearing automatically when `links.live` is set.
- Wired in real links: Compiler and OMG → GitLab, LibraTech → GitLab + live demo. TrustBuy stays GitHub with a placeholder until you send that link.
- Expanded `.gitignore` with editor/OS clutter (`.vscode/`, `.idea/`, `Thumbs.db`) on top of the existing `node_modules`, `.next`, `.vercel`, `.env*` entries — already safe to push to GitHub as-is.

## Latest updates (round 4)

- `skillGroups` in `data.ts` now includes this portfolio's own stack: Next.js, TypeScript, Tailwind CSS, GSAP, and Framer Motion under "Languages & Web", and Vercel under "Tools & DevOps".
- `projects` in `data.ts` reordered newest → oldest: Portfolio (Aug 2026) → Compiler (Jan 2026) → LibraTech (Nov 2025) → OMG (Mar 2025) → TrustBuy (Jan 2025). Numbering (`_01` … `_05`) updated to match.
- Portfolio's `dates` simplified to "Aug 2026". LibraTech's `team` no longer says "(2–4 members)".
