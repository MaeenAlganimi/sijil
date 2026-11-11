# Sijil

Sijil helps businesses track the expiry dates of licenses, contracts, permits, insurance, and other important documents, with reminders before renewal is due.

This repository contains the public marketing website and a desktop wrapper. The real Sijil application source code and business logic live in a separate private repository and are not included or recreated here.

## Website

The static product site is built with Vite, React, and TypeScript. It includes the shared studio theme, responsive layouts, and product screens with sample data. They do not contain real customer data.

Deploy the site to Vercel with the included `vercel.json`. The hosted product is at [sijil-dun.vercel.app](https://sijil-dun.vercel.app).

## Downloads

- **Windows x64:** setup installer (`Sijil-Setup-x64.exe`)
- **Linux x86_64:** AppImage (`Sijil-x86_64.AppImage`)
- **macOS:** coming later; a Mac build machine is required

Downloads link to stable filenames on this repository’s [latest GitHub release](https://github.com/MaeenAlganimi/sijil/releases/latest). Current desktop builds are unsigned. Windows is a one-click setup `.exe` (per-user install, Start Menu and desktop shortcuts, uninstall from Settings → Apps). Builds are not code-signed, so SmartScreen may warn: choose More info → Run anyway. Artifact sizes and SHA256 values shown on the site come from [`src/manifest.json`](src/manifest.json), copied from the build manifest in `desktop/release/manifest.json`.

## Desktop wrapper

The Electron app loads `https://sijil-dun.vercel.app` by default (the `DEFAULT_APP_URL` constant at the top of `desktop/main.cjs`) and can be configured with `SIJIL_APP_URL` or `--sijil-url=https://...`. It is a secure wrapper around the hosted app, not a local copy of the product. Its window enables context isolation and sandboxing, disables Node integration, restricts in-app navigation to the configured origin, and opens external HTTPS/mail links in the system browser. When offline, the server returns an HTTP error, or loading fails, a branded local screen offers retry.

## Development

```sh
npm install
npm run lint
npm run typecheck
npm run build
```

Build from `desktop/` with `npm install && npm run build:linux`. The Windows installer is compiled with the native Linux `makensis` from [`desktop/installer.nsi`](desktop/installer.nsi) (no Wine needed): build `win-unpacked` with electron-builder, then run `makensis -DPRODUCT=... -DAPPID=... -DVERSION=1.0.0 -DSRC=<win-unpacked> -DOUTFILE=<Setup.exe> desktop/installer.nsi`. Linux packaging produces an AppImage. Release artifacts are kept in the gitignored `desktop/release/` directory.

### Releases and auto-updates

Pushing a tag such as `v1.0.1` (it must match `version` in `desktop/package.json`) runs the release workflow (`.github/workflows/release.yml`, staged at `ci/release.yml` until it is moved there), which builds the Windows setup installer (with electron-builder's NSIS target) and the Linux AppImage on GitHub Actions and attaches them, with the `latest.yml` / `latest-linux.yml` update metadata, to that tag's GitHub release. Installed apps use `electron-updater` to check this repository's GitHub Releases and install a newer version when the app quits. Apps installed from v1.0.0 do not include the updater, so those users need to install the next version manually once.

## Project notes

This public repository was built with AI assistance. It does not contain secrets, `.env` files, or the private application’s source code.
