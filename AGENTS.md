# AGENTS.md

Guidance for coding agents (ChatGPT Codex and others) working on NeuroGaze Lab.

## What this is

An interactive neuro-ophthalmology teaching site for undergraduate students, from the Department of Ophthalmology, UiTM. Students place lesions on neural pathways, examine the patient and watch the signal trace through the pathway. It is a static site with no build step and no dependencies.

## Files

- `index.html`: the whole app (HTML, CSS and JavaScript in one file). Module 1 (horizontal gaze) and Module 5 (visual pathway) each live in their own `<section id="view-m1">` / `<section id="view-m5">` and their own `<script>` IIFE. A small shared script before them provides the pausable animation clock (`ngNow`, `ngSleep`, `ngResume`, `ngAnim`).
- `sw.js`: service worker for offline use.
- `manifest.webmanifest`, `icons/`: installable app metadata.
- `vercel.json`: hosting headers.

## Run locally

```
npx serve .
```

Then open http://localhost:3000 (`/#m1` and `/#m5` deep-link to the modules).

## Rules

- Keep it a single-file static app: no frameworks, bundlers or new dependencies.
- **Every change to the app must bump `CACHE` in `sw.js`** (for example `neurogaze-v10` to `neurogaze-v11`), or installed copies on phones keep the old version.
- Students mostly use phones. Check every change at about 390px wide: no horizontal scrolling, and the pathway diagram, its Replay / Pause / Info buttons and the Signal route should stay reachable without scrolling back up.
- Colours come from CSS variables on `:root`, with dark-mode overrides. Use the variables rather than hard-coded colours.
- Respect `prefers-reduced-motion`; the existing code already skips animations when it is set.
- Medical content (findings, teaching notes, signal routes) must stay clinically accurate. Do not reword it unless asked.
- The front page shows "Department of Ophthalmology, UiTM"; keep it.

## Deploy

This folder is the **Codex version** of NeuroGaze, kept separate from the original so the two can be compared.

- Codex version (this folder, git branch `codex`): https://neurogaze-codex.vercel.app. Vercel project `neurogaze-codex`, linked through `.vercel/`.
- Original version (folder `../neurogaze`, branch `main`): https://neurogaze-mu.vercel.app. **Do not edit or deploy the original.**

Pushing to GitHub does **not** deploy. Deploy by hand from this folder with `npx vercel --prod`. Save work with `git push origin codex`; never push to `main`.
