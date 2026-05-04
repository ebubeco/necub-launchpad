# Necub — SaaS Landing Page

A single-page, dark-themed, premium landing page modeled after Vercel/Stripe, closely matching the uploaded reference mockup.

## Design System

- Dark UI: near-black background (`#0A0A0F`) with elevated panel surfaces (`#111118`) and subtle borders.
- Accent: violet → blue gradient (`#A855F7 → #3B82F6`) used sparingly on headline highlight, primary CTA, and key UI accents.
- Typography: Inter (sans-serif), tight tracking on display headings, generous line-height on body.
- Spacing: large vertical rhythm (96–128px between sections), max-width 1200px container.
- Motion: fade-in + slight translate on scroll, hover scale on cards/buttons, subtle gradient glow behind hero.

## Page Sections

1. **Top Nav** — Necub wordmark + logo glyph, links (Product, Solutions, Resources, Company, Pricing), `Sign in` and `Join Early Access` button (gradient).
2. **Hero**
   - Eyebrow chip: "AI-INFRASTRUCTURE FOR MODERN BUSINESSES"
   - H1: "AI Infrastructure for **Smarter, Scalable** Businesses" (gradient highlight)
   - Subhead + dual CTAs: `Join Early Access`, `Book a Demo`
   - Social proof avatars: "Join 120+ early teams exploring Necub"
   - Credibility strip (4 mini cards): Built for scalability · Designed for high-growth teams · Powered by modern cloud infrastructure · Secure by design and privacy-first
   - Right side: AI-generated realistic SaaS dashboard mockup (dark theme) showing Overview, Data Processed (2.4 TB), Events Processed (98.6%), Automation Runs (1.2M), Active Workflows (156), data-processing chart, top workflows list, system status, recent activity, data sources donut.
   - Side card: "Built for Scale" with cloud illustration, bullets (handles large datasets, real-time processing, cloud-native), and pinned note: "Designed to support high-volume data processing and scalable AI workloads."
3. **Trust / Logo Strip** — "Trusted by innovative teams building the future" with 6 grayscale placeholder company logos (Acme Corp, Finova, Datapeak, Lumenic, Stackly, CloudWave).
4. **Problem · Solution · How It Works · Use Cases** — 5-column composed grid (matches reference):
   - The Challenges: Fragmented Data, Inefficient Workflows, Scaling Complexity
   - Our Solution: intro paragraph + 4 feature tiles (AI-Powered Insights, Real-Time Analytics, Scalable Architecture, Secure Infrastructure)
   - How It Works: 3 numbered steps (Connect → Analyze → Automate & Scale)
   - Use Cases: SaaS Platforms, FinTech Systems, E-commerce, Data Teams
   - Sticky CTA card: "Ready to build smarter systems with Necub?" with `Join Early Access`
5. **Stats / Footer Band**
   - About blurb left (Necub mission, mentions cloud-native + high-volume + real-time analytics).
   - 4 stats: 120+ Early Access Teams · 2.4TB+ Data Processed Every Week · 1.2M+ Automations Executed · 99.99% System Reliability.
   - Footer columns: Product, Resources, Company + contact `hello@necub.ai`, copyright, legal links, social icons (LinkedIn, X, GitHub).
   - Tagline lines included in copy: "Integrates with databases, APIs, and cloud storage systems." and "Built on modern cloud infrastructure designed for scalability and performance."

## Content Notes (tone)

Stripe/Vercel-style: declarative, technical, no hype words ("revolutionary", "game-changing"). All exact copy from the brief is used verbatim where specified.

## Technical

- New components under `src/components/landing/`: `Nav`, `Hero`, `DashboardMock`, `LogoStrip`, `SolutionGrid` (problem/solution/how/usecases/cta combined), `StatsFooter`.
- Replace `src/pages/Index.tsx` to compose them.
- Update `src/index.css` design tokens (HSL): dark background, foreground, border, gradient stops, plus utility classes for `bg-grid`, `gradient-text`, `glow`.
- Extend `tailwind.config.ts` with fade-in/slide-up keyframes and `animate-fade-in`, `hover-scale`.
- Generate 1 hero illustration via Lovable AI image gen (cloud + server stack, violet glow) saved to `src/assets/hero-cloud.png`. The dashboard itself is built in real HTML/CSS (not an image) so it stays crisp and animated.
- Logos rendered as inline SVG placeholders (grayscale, hover to white).
- Fully responsive: dashboard collapses below hero on `<lg`, grid stacks on mobile, nav becomes hamburger sheet.
- Lucide icons throughout; no external image deps beyond the one hero asset.

## Out of Scope

- No backend, auth, forms wiring (CTA buttons are visual only; can hook to a form later).
- No routing beyond existing `/`.
