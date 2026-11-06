# Sijil

Sijil helps businesses track the expiry dates of licenses, contracts, permits, insurance, and other important documents, with reminders before renewal is due.

This repository contains the public marketing website and a desktop wrapper. The real Sijil application source code and business logic live in a separate private repository and are not included or recreated here.

## Website

The static product site is built with Vite, React, and TypeScript. It includes the shared studio theme, responsive layouts, and clearly labeled illustrative interface mockups. The mockups are sample artwork, not screenshots or customer data.

Deploy the site to Vercel with the included `vercel.json`. The hosted product is at [sijil-dun.vercel.app](https://sijil-dun.vercel.app).

## Downloads

- **Windows x64:** portable ZIP (`Sijil-win-x64.zip`)
- **Linux x86_64:** AppImage (`Sijil-x86_64.AppImage`)
- **macOS:** coming later; a Mac build machine is required

Downloads link to stable filenames on this repository’s [latest GitHub release](https://github.com/MaeenAlganimi/sijil/releases/latest). Current desktop builds are unsigned. Windows is a portable ZIP (not an installer), and SmartScreen may display a warning when opening the app. Artifact sizes and SHA256 values shown on the site come from [`src/manifest.json`](src/manifest.json), copied from the build manifest in `desktop/release/manifest.json`.

## Desktop wrapper

The Electron app loads `https://sijil-dun.vercel.app` by default and can be configured with `SIJIL_APP_URL` or `--sijil-url=https://...`. It is a secure wrapper around the hosted app, not a local copy of the product. Its window enables context isolation and sandboxing, disables Node integration, restricts in-app navigation to the configured origin, and opens external HTTPS/mail links in the system browser. When offline, the server returns an HTTP error, or loading fails, a branded local screen offers retry.

## Development

```sh
npm install
npm run lint
npm run typecheck
npm run build
```

Build desktop artifacts from `desktop/` with `npm install && npm run build:linux && npm run build:windows` (the Windows ZIP build disables executable signing/editing because Wine is unavailable in this Linux environment). Linux packaging produces an AppImage. Windows packaging produces a portable ZIP because this build environment does not have Wine; no installer is offered. Release artifacts are kept in the gitignored `desktop/release/` directory.

## Project notes

This public repository was built with AI assistance. It does not contain secrets, `.env` files, or the private application’s source code.
