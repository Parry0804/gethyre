# GetHyre.ai website

The marketing website for GetHyre.ai, a product of Edvantage Learning.
Live: https://www.gethyre.ai · Repo: `Parry0804/gethyre` · Hosting: Vercel

- **Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4, Zod.
- **Pages (all static):** Home, Product, Colleges, Companies, About, Contact, Early access, How we assess,
  Careers, Privacy, Terms, Thank you, 404.
- **Forms:** student early access, college partnership, company hiring interest, contact. One Server Action
  validates, rate-limits, checks spam, saves to Google Sheets and sends emails through Resend.
- **Launch checklist and risks:** see [`docs/LAUNCH.md`](docs/LAUNCH.md).

## Run it locally

Node.js 20.9 or newer (`.nvmrc` pins 22).

```bash
npm install
npm run dev        # http://localhost:3000
```

With no settings, forms work in development and print each lead in the terminal.

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run check` | Type-check and lint (run before every push) |

> This project uses Next.js 16. APIs differ from older versions: check `node_modules/next/dist/docs/`
> before changing framework code (see `AGENTS.md`).

## Project structure

```
app/                     Routes. One folder per page; page.tsx is the page.
  page.tsx               Home
  actions/leads.ts       The single Server Action behind every form
  layout.tsx             Header, footer, fonts, metadata, structured data
  globals.css            Design tokens (colours, radii, shadows) and motion utilities
  robots.ts, sitemap.ts  Search engine files
components/
  ui.tsx                 Base building blocks: Container, Section, headings, buttons, cards
  icons.tsx              Inline SVG icons
  motion.tsx             Scroll reveal, count-up and visibility hooks
  layout/                Header + phone menu, footer, store buttons, social links, WhatsApp button, analytics
  marketing/             Page hero, feature cards, photos, phone mockup, video players, legal page templates
  product/               Live product demos, hero video, product tour, phase illustrations, home sections
  forms/lead-form.tsx    The shared form used by every lead form
content/                 Copy and data, kept out of components
  product.ts             The product modules (Product page and tour)
  journey.ts             The 7-step journey (hero)
  photos.ts              Unsplash photos with credits
  privacy.ts             Privacy policy text
lib/
  site.ts                Company details, links, navigation, downloads. Most edits start here.
  forms.ts               Form fields, validation rules, Google Sheet columns
  sheets.ts, email.ts    Google Sheets and Resend (server only)
  turnstile.ts           Cloudflare Turnstile check (server only)
  rate-limit.ts          Per-IP and per-email submission limits
  sanitize.ts            Cleans form input; blocks spreadsheet formula injection
  utm.ts, track.ts       Campaign tags and analytics events
public/
  brand/                 Logo and social share image
  screens/               App screens (780×1688 WebP)
  video/                 Hero loop and demo video (H.264, web-optimised)
docs/LAUNCH.md           Go-live checklist, security notes, risks
```

### Common edits

| To change | Edit |
| --- | --- |
| Company name, emails, city, social links, store links | `lib/site.ts` (or the matching env variable) |
| Main menu and footer links | `mainNav` / `footerNav` in `lib/site.ts`, `mobileLinks` in `components/layout/site-nav.tsx` |
| Product modules and copy | `content/product.ts` |
| A form's fields or validation | `lib/forms.ts` |
| Photos | `content/photos.ts` (Unsplash photo IDs) |
| Privacy policy | `content/privacy.ts` |
| Colours and fonts | `app/globals.css` (`@theme`) and `app/layout.tsx` |
| Replacing a video or screen | Upload with a **new file name** (files are cached for 30 days) and update the path |

## Settings

Copy `.env.example` to `.env.local` locally, and add the same keys in Vercel → Project → Settings →
Environment Variables. Everything is optional for local work. In production, forms need Google Sheets
and/or Resend, otherwise they show "Our form isn't connected yet".

### Google Sheets

1. Create a Google Sheet with tabs `Students`, `Colleges`, `Companies`, `Contact`, and these headers in row 1:
   - Students: `Submitted (IST), Name, Email, WhatsApp, College, Course, Target role, Page, UTM source, UTM medium, UTM campaign, Consent version`
   - Colleges: `Submitted (IST), Name, Designation, College, Phone, Email, Final-year students, Page, UTM source, UTM medium, UTM campaign, Consent version`
   - Companies: `Submitted (IST), Name, Company, Email, Phone, Roles, Freshers per year, Page, UTM source, UTM medium, UTM campaign, Consent version`
   - Contact: `Submitted (IST), Name, Email, Topic, College or company, Message, Page, UTM source, UTM medium, UTM campaign, Consent version`
2. In Google Cloud, create a service account, enable the Google Sheets API and create a JSON key.
3. Share **only this sheet** with the service account's email as Editor.
4. Set `GOOGLE_SHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL` and `GOOGLE_PRIVATE_KEY`.

If a sheet write fails and Resend is set up, the lead is emailed to `LEADS_ALERT_EMAIL` so nothing is lost.

### Campus tracking

Give each college its own link, for example `https://www.gethyre.ai/early-access?utm_source=college-name&utm_medium=qr`.
The first UTM tags a visitor arrives with are saved with their form, so the sheet shows sign-ups per college.

## Security

- **Secrets stay on the server.** Only `NEXT_PUBLIC_*` values reach the browser. Google, Resend and Turnstile
  keys are read only in files marked `server-only`. Never commit `.env.local` (git-ignored).
- **Headers on every response:** Content-Security-Policy, HSTS, X-Frame-Options / frame-ancestors, nosniff,
  Referrer-Policy, Permissions-Policy, COOP; no `X-Powered-By`. Adding a new outside service (chat widget,
  analytics) means adding its domain to the CSP in `next.config.ts`.
- **Forms:** field allow-list, input cleaning and length caps, letters-only names, spreadsheet formula
  neutralising, honeypot, rate limits (5 per IP per 10 min, 3 per email per hour), Turnstile when configured,
  same-origin Server Actions (no CORS surface), no personal data in logs.
- No logins, user accounts, database or admin area exist on this site.

## Deploy

Every push to `main` deploys to production on Vercel automatically. Pushes to other branches get a
private preview URL (kept out of search engines by `app/robots.ts`).

Before pushing: `npm run check && npm run build`.
