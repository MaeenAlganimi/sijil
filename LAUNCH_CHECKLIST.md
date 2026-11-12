# Sijil — launch checklist (owner actions)

Done on `launch-readiness`: Electron 45 + auto-update via GitHub Releases, CI/release workflows, favicon, OG/robots/sitemap, bilingual 404 page (the catch-all rewrite that showed the home page for every unknown URL is removed), honest "sample data" wording on screenshots, draft EN/AR privacy and terms. Typecheck, lint and build pass locally.

## Blocking
- [ ] **Rotate the password** of the personal account that was hardcoded as a test login in an old web-app build. It is gone from the web app repo's `main` (`docu-guardian`), but still public in the JavaScript served at **sijil-dun.vercel.app** and in that repo's history.
- [ ] **sijil-dun.vercel.app serves an old build.** This site's "Open the web app" link and the desktop wrapper (`DEFAULT_APP_URL` in `desktop/main.cjs`) both point there. Redeploy that Vercel project from current `docu-guardian` `main`, or move both links to the up-to-date deployment / final domain.
- [ ] **GitHub billing lock**: fix at https://github.com/settings/billing, then `gh run rerun --failed`.
- [ ] **Legal placeholders** in `src/legal.ts` (41 `[...]` markers): legal entity name and address, effective date, governing law / courts, data protection law, retention period, Supabase region, email provider (Resend?), WhatsApp/SMS provider, whether the AI assistant is on, whether Vercel Analytics is on, liability cap, pricing, shutdown notice, change-notice method, no sale of data, contact email. Then set `LEGAL_DRAFT = false`. Have a lawyer review.
- [ ] **Domain**: pick the final domain(s); then update `DEFAULT_APP_URL`, canonical/OG URLs in `index.html`, `public/sitemap.xml`, `public/robots.txt` and `webApp` in `src/main.tsx`.

## Release
- [ ] Merge, then tag `v1.0.1` so installers include the auto-updater. v1.0.0 users update manually once.
- [ ] Update `src/manifest.json` sizes/SHA256 after the new release.
- [ ] Decide whether to delete the old `Sijil-win-x64.zip` asset from v1.0.0.
- [ ] Windows code-signing certificate (optional). macOS needs a Mac + Apple Developer ID.
