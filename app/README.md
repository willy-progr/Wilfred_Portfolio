# Wilfred Kivinda Portfolio

A production-ready personal portfolio website for Wilfred Kivinda — a Data & Insights Professional based in Nairobi, Kenya.

## Architecture Overview

- **Frontend**: Next.js 15 App Router + TypeScript + Tailwind CSS — component-driven, static export for Cloudflare Pages
- **Content Service**: Centralized `data/siteContent.ts` — single source of truth for all resume-derived content
- **Contact Service**: [Web3Forms](https://web3forms.com) — the form posts from the browser (works with static export and local dev; see **Contact form** below)
- **Analytics Service**: Minimal opt-in client hook (`lib/analytics.ts`) — privacy-minded, no cookies, only tracks page views and section visibility
- **SEO Service**: Centralized metadata and JSON-LD generation (`lib/seo.ts`) — Open Graph, Twitter Cards, Person + WebSite structured data

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5.8 |
| Styling | Tailwind CSS 3.4 |
| Fonts | Playfair Display (display) + Inter (body) via Google Fonts |
| 3D Effects | Three.js (hero perspective grid) |
| Animation | CSS transitions + IntersectionObserver |
| Hosting | Cloudflare Pages (static export) |

## Environment Variables

Create a `.env.local` file for local development. **Never commit this file.**

| Variable | Required | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | No | `https://wilfredkivinda.example` | Canonical domain for SEO |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | **Yes** (for the form) | — | [Web3Forms](https://web3forms.com) access key; set your receiving inbox in the Web3Forms dashboard |
| `NEXT_PUBLIC_ANALYTICS_ID` | No | — | Analytics ID — only loads when set |
| `NODE_ENV` | No | `development` | Build/runtime mode (usually automatic) |

### Cloudflare Pages Environment Variables

Set these in the Cloudflare Pages dashboard → Settings → Environment variables:

- `NEXT_PUBLIC_SITE_URL` → your production domain
- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` → your Web3Forms key (see **Contact form**)

## Local Development

```bash
# Install dependencies
npm ci

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

The development server runs at `http://localhost:3000`.

## Deployment to Cloudflare Pages

### Option 1: Direct Upload

1. Build the project:
   ```bash
   npm ci && npm run build
   ```

2. The static export is generated in the `out/` directory.

3. In Cloudflare Pages dashboard:
   - Create a new project
   - Upload the `out/` folder
   - Set environment variables (see above)
   - Deploy

### Option 2: Git Integration

1. Push this repository to GitHub/GitLab.

2. In Cloudflare Pages:
   - Create project → Connect to Git
   - Select your repository
   - Build settings:
     - **Build command**: `npm run build`
     - **Build output directory**: `out`
   - Set environment variables
   - Save and deploy

### Option 3: Wrangler CLI

```bash
# Install Wrangler
npm install -g wrangler

# Login
wrangler login

# Deploy
wrangler pages deploy out --project-name=wilfred-kivinda-portfolio
```

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with SEO metadata + JSON-LD
│   │   ├── page.tsx            # Main page composing all sections
│   │   └── globals.css         # Global styles + animations
│   ├── components/
│   │   ├── Header.tsx          # Fixed navigation with scroll tracking
│   │   ├── Footer.tsx          # Simple footer with back-to-top
│   │   └── PerspectiveGrid.tsx # Three.js 3D grid hero background
│   ├── sections/
│   │   ├── Hero.tsx            # Full-viewport hero with stats bar
│   │   ├── About.tsx           # Teal background about section
│   │   ├── Impact.tsx          # Frosted glass impact cards
│   │   ├── Experience.tsx      # Timeline with expandable roles
│   │   ├── Skills.tsx          # Dark section with skill chips
│   │   ├── Education.tsx       # Education cards grid
│   │   ├── Referees.tsx        # Reference cards
│   │   └── Contact.tsx         # Contact form + info
│   ├── lib/
│   │   ├── seo.ts              # SEO metadata + JSON-LD generators
│   │   ├── analytics.ts        # Privacy-minded analytics hook
│   │   └── contact.ts          # Contact form (Web3Forms)
│   ├── data/
│   │   └── siteContent.ts      # ALL resume-derived content
│   └── types/
│       └── index.ts            # TypeScript type definitions
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── cv/
│   │   └── Wilfred-Kivinda-CV.pdf   # Placeholder — replace with actual CV
│   └── images/
│       ├── portrait.jpg
│       └── og-image.jpg
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.js
└── eslint.config.mjs
```

## CV Download

The "Download CV" button links to `/cv/Wilfred-Kivinda-CV.pdf`. **Before deployment**, place the actual CV PDF file at:

```
public/cv/Wilfred-Kivinda-CV.pdf
```

A placeholder file is included — replace it with the real CV.

## Contact Form

1. Open [web3forms.com](https://web3forms.com) and create a form. Set the **inbox** to the address you want to receive messages on (e.g. `kivindawilfred@outlook.com`).
2. Copy the **Access Key** into `.env.local` as `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=...`
3. For **Cloudflare Pages**: add the same variable under **Settings → Environment variables** for the **production** (and **preview** if you use it) build so `npm run build` embeds the key in the static bundle. Redeploy after adding it.

The form only works when that variable is set; if it is missing, the UI shows a clear error and visitors can still use **Email Me**.

## Analytics

Analytics is **opt-in** and only loads when `NEXT_PUBLIC_ANALYTICS_ID` is set. It tracks:

- Page views
- Section visibility (which sections users scroll to)
- CTA clicks

No cookies are set. No personal data is collected. Events are sent via `navigator.sendBeacon` for reliable delivery.

## SEO

The site includes:

- Meta title and description
- Open Graph tags (title, description, image, URL)
- Twitter Card tags
- Canonical URL
- JSON-LD structured data:
  - `Person` schema with name, job title, email, phone, address, education, languages
  - `WebSite` schema with site name and URL
- `robots.txt` allowing all crawlers
- `sitemap.xml` with the homepage URL

## Performance

- Static HTML export — no server runtime required
- Minimal JavaScript — only essential interactivity
- Images optimized at build time
- Three.js grid paused when hero is not visible
- CSS transitions respect `prefers-reduced-motion`

## Accessibility

- WCAG AA contrast ratios met
- Semantic HTML throughout
- Focus-visible outlines on all interactive elements
- Form labels associated with inputs
- Keyboard-navigable mobile menu
- `prefers-reduced-motion` respected

## Post-Deploy Checks

After deploying, verify:

1. [ ] Homepage loads without errors
2. [ ] All sections are visible and styled correctly
3. [ ] Navigation smooth-scrolls to sections
4. [ ] Contact form submits successfully (check honeypot, validation)
5. [ ] CV download link works (after uploading real PDF)
6. [ ] `robots.txt` accessible at `/robots.txt`
7. [ ] `sitemap.xml` accessible at `/sitemap.xml`
8. [ ] OG image accessible at `/images/og-image.jpg`
9. [ ] JSON-LD structured data in page source
10. [ ] Meta tags present in page source
11. [ ] Lighthouse score: Performance > 90, Accessibility > 95, SEO > 95

## License

MIT License — see LICENSE file.

## Assumptions & Questions

1. **CV File**: The placeholder CV at `public/cv/Wilfred-Kivinda-CV.pdf` must be replaced with the actual PDF before deployment.
2. **LinkedIn URL**: The LinkedIn URL in `siteContent.ts` is a placeholder. Update with the actual profile URL.
3. **Domain**: Update `NEXT_PUBLIC_SITE_URL` to the actual domain before deployment.
4. **Contact form**: Set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` and your inbox in [Web3Forms](https://web3forms.com) (see **Contact form** above).
5. **Analytics**: Set `NEXT_PUBLIC_ANALYTICS_ID` only if analytics tracking is desired (opt-in).
