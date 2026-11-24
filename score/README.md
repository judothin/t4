# score.

Pocket score tracker. Vite + React, installable as a PWA. Binho first, more games later.

```bash
cd score
npm install
npm run dev       # http://localhost:5173 (also on your LAN via --host)
npm run build     # static build in dist/
npm run preview
```

## Add to home screen
Open the deployed (HTTPS) URL on your phone → **Share → Add to Home Screen** (iOS) or **Install app** (Android/Chrome).
It runs full-screen and works offline after the first load. `base: './'` means `dist/` can be hosted from any sub-path.

## Binho rules (as implemented)
- Goal = +1, first to 7 wins (5 / 7 / 10 / 11 selectable in ⋯).
- Ball kicked out = **yellow**. First one is just a warning.
- Second out = **red** → coin toss. The *other* player calls it.
  - Called right → they choose which of the carded player's pegs comes out.
  - Called wrong → the carded player chooses.
  - Yellows reset after a red.
- Every action can be undone (↶). Undo after a red rolls back the whole out → coin toss.
- **Face-off mode** flips the top panel 180° so both players can read it across the board.

Before each match a setup screen lets each side pick a saved player (or type a new one) and a color; the colors theme the board and background. Saved players, sides, target and the live match are kept in `localStorage`.

## Adding a game
Create `src/games/<id>/<Game>.jsx` and register it in `src/games/registry.js`.

## Deploy (Vercel)
Import the repo at vercel.com/new and set **Root Directory → `score`**. Everything else comes from `score/vercel.json`.
Every push to `main` redeploys; other branches get preview URLs.
