# NeuroGaze Lab

An interactive neuro-ophthalmology learning tool for undergraduate students. Students place lesions on the neural pathways, examine the patient, and trace the signal to see why each clinical sign occurs.

## Modules

| Module | Status |
|---|---|
| 1 · Horizontal gaze (FEF, PPRF, abducens nucleus, MLF, CN III/VI) | Ready |
| 2 · Vertical gaze | Planned |
| 3 · Cranial nerves III, IV, VI | Planned |
| 4 · Pupils | Planned |
| 5 · Visual pathway (optic nerve to occipital cortex) | Ready |

Each module has:
- **Explore** mode: case library, tap-to-lesion pathway, animated signal route, findings and teaching notes
- **Diagnose** mode: hidden cases, a full bedside exam, and "What if?" feedback comparing the student's answer with the real lesion

## Files

```
index.html             the whole app (HTML, CSS and JavaScript in one file)
manifest.webmanifest   lets phones install it as an app
sw.js                  service worker: makes it work offline
icons/                 app icons
vercel.json            hosting headers for Vercel
```

There is no build step. It is a static site.

## Run locally

Open a terminal in this folder and run:

```
npx serve .
```

Then open http://localhost:3000. (Opening index.html directly also works, but offline mode needs a server.)

## Deploy

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project**, import the repository, keep the framework preset as **Other**, and deploy.
3. Every push to the main branch redeploys automatically.

When you change the app, also change `CACHE` in `sw.js` (for example `neurogaze-v2`) so installed copies on phones update.

## Deep links

- Home: `/`
- Module 1: `/#m1`
- Module 5: `/#m5`

## Disclaimer

Educational prototype. Schematic, not to anatomical scale. Not for clinical decision-making.
