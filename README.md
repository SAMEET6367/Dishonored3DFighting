# Dishonored: 3D Fighting Game — React Website

A responsive gaming website for **Dishonored: 3D Fighting Game**, made with **React 19 + Vite 7 + plain CSS**.

The site presents Dishonored as a finished Windows game: nine fighters, campaign, 1v1 Arena (VS Player / VS Bot), and Boss Fights.

## Sections

- **Home** — cinematic hero
- **About** — campaign, arena, and boss modes
- **Fighters** — featured portraits (Pacer, Buster, Gastino, Xebec)
- **Enemies** — hostile machines
- **Gallery** — gameplay loops and key art
- **Windows Download** — configurable button + pre-release modal
- **FAQ** and footer

## Run locally

1. Install Node.js 20.19+ or Node.js 22.12+.
2. Open this folder in a terminal.
3. Run:

```bash
npm install
npm run dev
```

4. Open the Vite address (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview
```

Vite outputs the production site into the `dist/` folder.

## Activate the Windows download

**No Windows game executable/ZIP is bundled.** Until configured, the download button shows a release-info modal.

### Option A: host installer in this website

1. Create `public/downloads/`.
2. Copy your build ZIP there, e.g. `Dishonored-Windows.zip`.
3. Open `src/siteConfig.js` and set:

```js
downloadUrl: '/downloads/Dishonored-Windows.zip',
```

### Option B: external URL

```js
downloadUrl: 'https://your-actual-download-link.example/game.zip',
```

## Customize

- **Site text:** `src/App.jsx`
- **Colors / layout:** `src/styles.css`
- **Download / trailer:** `src/siteConfig.js`
- **Images:** `public/images/`
- **Metadata:** `index.html`

## Credits

Website filled with **DISHONORED** names, modes, fighter art, enemy art, and gameplay.
