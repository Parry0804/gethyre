# Going live on www.gethyre.ai

Owner: Edvantage Learning (GetHyre.ai). Review this list before launch and again every quarter.

## 1. Must do before launch

| # | Task | Where | Why |
| --- | --- | --- | --- |
| 1 | **Upgrade the Vercel project to Pro** ($20/month per developer seat) | Vercel → Settings → Billing | The free Hobby plan is for personal, non-commercial use only. A commercial site on Hobby can be paused for a policy violation, and Hobby usage limits pause a project for up to 30 days. |
| 2 | **Connect the domain** `gethyre.ai` and `www.gethyre.ai` | Vercel → Project → Domains, then the DNS records Vercel shows at your registrar | Choose `www.gethyre.ai` as primary and redirect the bare domain to it. Also redirect `gethyre-rouge.vercel.app` to the domain. |
| 3 | Set `NEXT_PUBLIC_SITE_URL=https://www.gethyre.ai` and redeploy | Vercel → Environment Variables | Search results, social previews and the sitemap use it. |
| 4 | **Connect the forms**: Google Sheets keys and/or Resend keys (see README) | Vercel → Environment Variables | Without them, live forms show "Our form isn't connected yet". |
| 5 | **Turn on Cloudflare Turnstile** (`NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`) | Cloudflare dashboard → Turnstile | Stops bots filling the forms and burning email or Sheets quotas. |
| 6 | Add a **Vercel Firewall rate-limit rule** for POST requests | Vercel → Project → Firewall | Works across all servers; the in-app limit is per server. |
| 7 | Fill the remaining legal placeholders: registered address, Grievance Officer name, dates and the bracketed choices in `content/privacy.ts`; registered address in `app/terms/page.tsx` | Code | Apple and Google check the privacy policy; it must name Edvantage Learning and a full address. Have a lawyer review both. |
| 8 | Add the App Store and Google Play links (`NEXT_PUBLIC_APP_STORE_URL`, `NEXT_PUBLIC_PLAY_STORE_URL`) | Vercel → Environment Variables | Until then the store buttons are not clickable. |
| 9 | Submit `https://www.gethyre.ai/sitemap.xml` | Google Search Console | Gets the site indexed. |

## 2. Things that could take the site down, and how they're handled

| Risk | Status / what to do |
| --- | --- |
| Hosting account paused (Hobby plan used commercially, or a usage limit hit) | Upgrade to Pro (item 1). On Pro, set **Spend Management** alerts so a traffic spike can't surprise you. Videos were compressed (demo video 14 MB → 4.4 MB; hero loop 2.0 MB → 1.5 MB) and are cached for 30 days, so data transfer stays low. |
| Domain expires or is hijacked | At the registrar: turn on **auto-renew**, **registrar lock** and **2FA**; keep the billing card current. |
| Lost access to GitHub or Vercel | Turn on **2FA** for every account. Add a second owner (a co-founder) to the Vercel team and the GitHub repo. |
| Bad deploy breaks the site | Every push deploys. If something breaks: Vercel → Deployments → previous deployment → **Instant Rollback**. Protect `main` on GitHub (require a pull request) once more than one person pushes. |
| Photos disappear | Photos are served from Unsplash's CDN under the Unsplash License. If one is ever removed, swap its ID in `content/photos.ts`. For full control, download them into `public/photos/` later. |
| Form spam / abuse | Honeypot, rate limits and input cleaning are built in; Turnstile and the Firewall rule (items 5–6) complete it. |
| Leaked keys | No secrets are in the code or git history (checked). If a key ever leaks, rotate it in Google Cloud / Resend / Cloudflare and update Vercel. |
| Takedown request over content | All photos are Unsplash License (credits in `content/photos.ts`), icons are Simple Icons (CC0) and Tabler (MIT), the font is Inter (OFL, licence in `app/fonts`). App screens and videos are your own. Use official Apple/Google store badges when you can. |
| Public repository | The repo `Parry0804/gethyre` is public. It holds no secrets, but consider making it **private** (GitHub → Settings → Danger Zone). Vercel deploys work the same. |

## 3. Security in place

- Security headers on every page: CSP, HSTS (2 years, preload), X-Frame-Options DENY / frame-ancestors none,
  nosniff, strict Referrer-Policy, Permissions-Policy (camera, mic, location, payment off), COOP; no X-Powered-By.
- Only `NEXT_PUBLIC_*` values reach the browser; server keys live in `server-only` files. Verified by building
  with dummy secrets and searching the browser bundles.
- Forms: allow-listed fields, input cleaning, length caps, letters-only names, spreadsheet formula neutralising,
  honeypot, per-IP and per-email rate limits, Turnstile, no personal data in logs. Server Actions only accept
  same-origin requests.
- No source maps shipped to browsers; no `.env`, `.git` or source files are reachable on the live site.
- Dependencies: `npm audit --omit=dev` reports 0 vulnerabilities. The only advisory is in dev tooling (ESLint)
  and never reaches the live site.
- There are no logins, accounts, database or admin pages, so there is nothing to brute-force or leak.

## 4. Performance (Lighthouse, mobile, local production build)

| Page | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Home | 95 (was 77) | 100 | 100 | 100 |
| Product | 95 | 100 | 100 | 100 |
| Colleges | 94 | 100 | 96 | 100 |
| Contact | 97 | 98 | 100 | 100 |

Home page before → after: total blocking time 780 ms → 40 ms; data loaded before the hero video starts ~2 MB → ~0.4 MB.

What makes it fast: every page is pre-rendered; the hero video loads only after the page has finished
loading; photos are resized by Unsplash's CDN (WebP/AVIF); media is cached for 30 days; fonts are self-hosted.

## 5. Keeping it healthy

- Monthly: `npm audit` and `npm outdated`; update `next`, `react`, `react-dom` promptly for security releases.
- Before each push: `npm run check && npm run build`.
- Replacing a video or image: use a new file name (files are cached for 30 days).
