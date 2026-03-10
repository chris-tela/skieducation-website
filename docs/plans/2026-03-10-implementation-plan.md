# SKI Education Website + Market Report — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a market research report (PDF-ready HTML) and a redesigned 8-page Astro + Tailwind website with interactive MCAT quiz, deployed to GitHub Pages.

**Architecture:** Static site using Astro with Tailwind CSS. Pages are Astro components with shared layout. MCAT quiz is a client-side Vanilla JS island. Market report is a standalone HTML file in `report/`. GitHub Pages deployment via Astro static adapter and GitHub Actions.

**Tech Stack:** Astro 5, Tailwind CSS 4, Vanilla JS (quiz), GitHub Pages

---

## Phase 1: Project Scaffolding

### Task 1: Initialize Astro project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `tailwind.config.mjs`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/pages/index.astro`
- Create: `.github/workflows/deploy.yml`
- Create: `.gitignore`

**Step 1: Scaffold Astro + Tailwind**

```bash
cd /c/Users/telac/repos/skieducation-website
npm create astro@latest . -- --template minimal --no-install --no-git
npm install
npx astro add tailwind -- -y
```

**Step 2: Configure for GitHub Pages**

Edit `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://<username>.github.io',
  base: '/skieducation-website',
  vite: {
    plugins: [tailwindcss()]
  }
});
```

**Step 3: Create base layout**

Create `src/layouts/BaseLayout.astro`:

```astro
---
interface Props {
  title: string;
  description?: string;
}
const { title, description = 'SKI Education Network - MCAT Preparation & Medical School Admissions' } = Astro.props;
---
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <title>{title} | SKI Education Network</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
</head>
<body class="font-[Inter,system-ui,sans-serif] text-gray-700 bg-white">
  <slot />
</body>
</html>
```

**Step 4: Create minimal index page to verify build**

Replace `src/pages/index.astro`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Home">
  <h1 class="text-4xl font-bold text-[#1e3a5f] p-8">SKI Education Network</h1>
</BaseLayout>
```

**Step 5: Verify build**

```bash
npm run build
```

Expected: Build succeeds, output in `dist/`.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro + Tailwind project with base layout"
```

---

### Task 2: Create shared components (Navbar + Footer)

**Files:**
- Create: `src/components/Navbar.astro`
- Create: `src/components/Footer.astro`
- Modify: `src/layouts/BaseLayout.astro`

**Step 1: Create Navbar**

Create `src/components/Navbar.astro`:

```astro
---
const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'MCAT Prep', href: '/mcat-prep' },
  { label: 'Medical Admissions', href: '/medical-admissions' },
  { label: 'Sample Exam', href: '/sample-exam' },
  { label: 'University Admissions', href: '/university-admissions' },
  { label: 'Immigration', href: '/immigration' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];
---
<nav class="bg-[#1e3a5f] text-white sticky top-0 z-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <a href="/" class="text-xl font-bold tracking-tight">SKI Education</a>

      <!-- Desktop nav -->
      <div class="hidden md:flex space-x-6">
        {navLinks.map(link => (
          <a href={link.href} class="text-sm font-medium hover:text-[#0d9488] transition-colors">
            {link.label}
          </a>
        ))}
      </div>

      <!-- Mobile hamburger -->
      <button id="mobile-menu-btn" class="md:hidden p-2" aria-label="Toggle menu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <div id="mobile-menu" class="hidden md:hidden pb-4">
      {navLinks.map(link => (
        <a href={link.href} class="block py-2 text-sm font-medium hover:text-[#0d9488]">
          {link.label}
        </a>
      ))}
    </div>
  </div>
</nav>

<script>
  document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
    document.getElementById('mobile-menu')?.classList.toggle('hidden');
  });
</script>
```

**Step 2: Create Footer**

Create `src/components/Footer.astro`:

```astro
<footer class="bg-[#1e3a5f] text-white mt-16">
  <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 class="text-lg font-bold mb-4">SKI Education Network</h3>
        <p class="text-gray-300 text-sm">Your pathway to medical school success. MCAT preparation, admissions consulting, and academic guidance.</p>
      </div>
      <div>
        <h3 class="text-lg font-bold mb-4">Quick Links</h3>
        <ul class="space-y-2 text-sm text-gray-300">
          <li><a href="/mcat-prep" class="hover:text-[#0d9488]">MCAT Prep</a></li>
          <li><a href="/medical-admissions" class="hover:text-[#0d9488]">Medical Admissions</a></li>
          <li><a href="/sample-exam" class="hover:text-[#0d9488]">Sample Exam</a></li>
          <li><a href="/about" class="hover:text-[#0d9488]">About Us</a></li>
        </ul>
      </div>
      <div>
        <h3 class="text-lg font-bold mb-4">Contact</h3>
        <ul class="space-y-2 text-sm text-gray-300">
          <li>Email: <a href="mailto:ski.inc100@gmail.com" class="hover:text-[#0d9488]">ski.inc100@gmail.com</a></li>
          <li><a href="https://wa.me/" class="hover:text-[#0d9488]">WhatsApp</a></li>
          <li><a href="https://skiinc.ca" class="hover:text-[#0d9488]" target="_blank" rel="noopener">skiinc.ca</a></li>
        </ul>
      </div>
    </div>
    <div class="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-400">
      &copy; 2026 SKI Education Network. All rights reserved.
    </div>
  </div>
</footer>
```

**Step 3: Wire into BaseLayout**

Add Navbar and Footer imports to `src/layouts/BaseLayout.astro`, place `<Navbar />` before `<slot />` and `<Footer />` after.

**Step 4: Verify build**

```bash
npm run dev
```

Open browser, confirm navbar and footer render. Check mobile hamburger.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Navbar and Footer shared components"
```

---

## Phase 2: Primary Pages

### Task 3: Home page

**Files:**
- Modify: `src/pages/index.astro`
- Create: `src/components/Hero.astro`
- Create: `src/components/FeatureCard.astro`
- Create: `src/components/Testimonials.astro`

**Step 1: Create Hero component**

A full-width hero with headline, subtitle, and two CTAs ("Explore MCAT Prep" and "Take Sample Exam").

- Background: Navy gradient
- Headline: "Your Path to Medical School Starts Here"
- Subtitle: "Expert MCAT preparation, admissions consulting, and academic guidance for aspiring physicians"
- Stats bar below hero: "98% Acceptance Rate", "1,000+ Students", "40+ Countries"

**Step 2: Create FeatureCard component**

Reusable card with icon slot, title, description, and CTA link. Used on home page for the 4 main offerings (MCAT Prep, Medical Admissions, University Admissions, Immigration).

**Step 3: Create Testimonials component**

Simple testimonial cards (3 placeholder testimonials with names, locations, quotes). CSS-only carousel or static grid.

**Step 4: Assemble Home page**

Wire Hero + 4 FeatureCards + Testimonials + a final CTA section into `index.astro`.

**Step 5: Verify in browser**

```bash
npm run dev
```

Check responsive layout on mobile and desktop.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: build Home page with Hero, features, and testimonials"
```

---

### Task 4: MCAT Prep page

**Files:**
- Create: `src/pages/mcat-prep.astro`

**Step 1: Build MCAT Prep page**

Sections:
1. **Hero banner** — "MCAT Preparation Program" with subtitle
2. **Why Choose SKI** — 3-4 benefit cards (Personalized Study Plans, Expert Tutors, Proven Results, Flexible Schedule)
3. **Curriculum Breakdown** — Accordion or grid showing all MCAT sections: Biological and Biochemical Foundations, Chemical and Physical Foundations, Psychological/Social/Biological Foundations, Critical Analysis and Reasoning Skills (CARS)
4. **Pricing Table** — MCAT Certificate at CA$300, with feature list (self-paced prep, lecture notes, question banks, 1:1 tuition)
5. **FAQ Accordion** — 5-6 common MCAT questions
6. **CTA** — "Start Your MCAT Journey" button linking to email/booking

**Step 2: Verify in browser, check mobile**

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add MCAT Prep page with curriculum, pricing, and FAQ"
```

---

### Task 5: Medical Admissions page

**Files:**
- Create: `src/pages/medical-admissions.astro`

**Step 1: Build Medical Admissions page**

Sections:
1. **Hero** — "Medical School Admissions Consulting"
2. **Pathways** — Two tracks: Traditional (Canadian/US med schools) and Caribbean (alternative pathway for competitive applicants)
3. **What We Offer** — Application review, personal statement coaching, interview prep, school selection strategy
4. **Clinical Training** — Research and clinical opportunities via AMOpportunities
5. **Process Steps** — Visual 5-step process (Consultation > Assessment > Application > Interview Prep > Acceptance)
6. **CTA** — Book a consultation

**Step 2: Verify, commit**

```bash
git add -A
git commit -m "feat: add Medical Admissions page"
```

---

### Task 6: Sample Exam page (interactive quiz)

**Files:**
- Create: `src/pages/sample-exam.astro`
- Create: `src/data/mcat-questions.json`
- Create: `src/components/McatQuiz.astro` (contains the client-side JS island)
- Create: `src/pages/sample-paper.astro` (print-optimized downloadable version)

**Step 1: Create MCAT questions data**

Create `src/data/mcat-questions.json` with 12 questions (3 per MCAT section):

```json
[
  {
    "id": 1,
    "section": "Biological and Biochemical Foundations",
    "question": "Which enzyme catalyzes the first committed step of glycolysis?",
    "options": [
      "Hexokinase",
      "Phosphofructokinase-1",
      "Pyruvate kinase",
      "Glucose-6-phosphatase"
    ],
    "correctIndex": 1,
    "explanation": "Phosphofructokinase-1 (PFK-1) catalyzes the conversion of fructose-6-phosphate to fructose-1,6-bisphosphate. While hexokinase is the first enzyme in glycolysis, PFK-1 is the first committed (irreversible, regulated) step."
  }
]
```

Fill in all 12 questions with accurate MCAT-level content across Bio/Biochem, Chem/Physics, Psych/Sociology, and CARS sections.

**Step 2: Build interactive quiz component**

Create `src/components/McatQuiz.astro` with embedded `<script>`:

- Load questions from imported JSON
- Render one question at a time
- Progress bar (Question X of 12)
- Radio button selection
- "Check Answer" reveals correct/incorrect + explanation
- "Next Question" advances
- Final screen: score summary (X/12), section breakdown, CTA to enroll in MCAT prep

All logic in Vanilla JS. No framework needed.

**Step 3: Build Sample Exam landing page**

`src/pages/sample-exam.astro`: Two sections:
1. "Take the Interactive Quiz" — embedded McatQuiz component
2. "Download Sample Paper" — link to `/sample-paper` with print instructions

**Step 4: Build printable sample paper page**

`src/pages/sample-paper.astro`:
- All 12 questions rendered in formal exam paper format
- Styled with print-optimized CSS (`@media print`)
- Header: "SKI Education Network — MCAT Sample Examination"
- Answer key at the end
- "Print / Save as PDF" button that calls `window.print()`

**Step 5: Test the quiz flow end-to-end in browser**

- Answer all 12 questions
- Verify scoring is correct
- Verify print page renders properly
- Test on mobile

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: add interactive MCAT quiz and printable sample paper"
```

---

## Phase 3: Secondary Pages

### Task 7: University Admissions page

**Files:**
- Create: `src/pages/university-admissions.astro`

**Step 1: Build page**

Sections:
1. Hero — "International University Admissions"
2. Partner Universities — Cards for Toronto Metropolitan, U of T, Brock (with logos if available, otherwise text)
3. 1,000+ Programs — Brief overview
4. 5-Step Process — Visual timeline
5. English Proficiency — CELPIP and CAEL testing info
6. CTA

**Step 2: Verify, commit**

```bash
git add -A
git commit -m "feat: add University Admissions page"
```

---

### Task 8: Immigration Services page

**Files:**
- Create: `src/pages/immigration.astro`

**Step 1: Build page**

Sections:
1. Hero — "Immigration Services"
2. Visa Types — Student visa, visitor visa, permanent residency cards
3. Legal Support — "Experienced lawyers" messaging
4. CTA

**Step 2: Verify, commit**

```bash
git add -A
git commit -m "feat: add Immigration Services page"
```

---

### Task 9: Blog template page

**Files:**
- Create: `src/pages/blog.astro`

**Step 1: Build page**

A placeholder blog listing page with 3 sample post cards:
- "When Should You Take the MCAT?"
- "Aspiring Physicians: US/Canada Application Timelines"
- "10 Tuition-Free Medical Schools to Consider"

Each card has title, date, category tag, excerpt, and "Read More" link (non-functional — placeholder).

**Step 2: Verify, commit**

```bash
git add -A
git commit -m "feat: add Blog template page with sample posts"
```

---

### Task 10: About & Contact page

**Files:**
- Create: `src/pages/about.astro`

**Step 1: Build page**

Sections:
1. Hero — "About SKI Education Network"
2. Mission — "Fueling Dreams, Building Futures" (corrected from original site)
3. Team — Placeholder advisor cards (3-4) with role titles
4. Global Reach — "40+ countries" stat with brief description
5. Contact Form — Simple HTML form (name, email, message) with `action="mailto:ski.inc100@gmail.com"` or Formspree-style
6. WhatsApp button — Floating or inline
7. Map or address placeholder

**Step 2: Verify, commit**

```bash
git add -A
git commit -m "feat: add About and Contact page"
```

---

## Phase 4: SEO & Deployment

### Task 11: SEO optimization

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Create: `public/robots.txt`
- Modify: `astro.config.mjs` (add sitemap integration)

**Step 1: Add sitemap integration**

```bash
npx astro add sitemap -- -y
```

**Step 2: Add structured data to BaseLayout**

Add JSON-LD script for Organization schema:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "SKI Education Network",
  "url": "https://www.medicaleducationskiedu.com",
  "description": "MCAT Preparation and Medical School Admissions Consulting"
}
</script>
```

**Step 3: Add robots.txt**

```
User-agent: *
Allow: /
Sitemap: https://<username>.github.io/skieducation-website/sitemap-index.xml
```

**Step 4: Verify meta tags render correctly per page**

```bash
npm run build
```

Inspect `dist/index.html`, `dist/mcat-prep/index.html` etc. for correct `<title>`, `<meta>`, OG tags.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add SEO optimization, sitemap, structured data"
```

---

### Task 12: GitHub Pages deployment workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

**Step 1: Create GitHub Actions workflow**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

**Step 2: Verify build works locally**

```bash
npm run build
```

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: add GitHub Pages deployment workflow"
```

---

## Phase 5: Market Research Report

### Task 13: Create market research report

**Files:**
- Create: `report/index.html`
- Create: `report/styles.css`

**Step 1: Create report HTML**

A standalone HTML document (NOT part of the Astro site) in `report/`. This is the PDF-ready deliverable.

Structure:
- Professional print-optimized CSS (A4 page sizing, headers, footers)
- Cover page: "SKI Education Network — Strategic Market Research Report", date, author
- Table of contents with page anchors
- 8 sections as specified in design doc:
  1. Executive Summary
  2. Current State Analysis (include audit findings table)
  3. Local Market Pivot Strategy (Canadian MCAT market data, competitor landscape)
  4. MCAT Program Enhancement Recommendations
  5. International Expansion Research (China, Russia, Gulf)
  6. Website & Brand Strategy
  7. Competitive Analysis (Princeton Review, Kaplan, Blueprint comparison table)
  8. Recommendations & Next Steps (prioritized action items)

Content should be substantive — real market data, real competitor analysis, real recommendations. Use the site audit data we gathered. Research current MCAT statistics, competitor pricing, and international student numbers.

**Step 2: Create print-optimized CSS**

`report/styles.css`:
- `@media print` rules for page breaks, margins, headers
- Professional typography (serif for body, sans-serif for headings)
- Tables, charts styled for print
- No background colors in print (waste ink)
- Page numbers via CSS counters

**Step 3: Verify print output**

Open `report/index.html` in browser. Use Print Preview (Ctrl+P) to verify:
- Page breaks are in correct places
- Tables don't split awkwardly
- Cover page is standalone
- Content is readable in B&W

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: add market research report (PDF-ready HTML)"
```

---

## Phase 6: Polish & Final Verification

### Task 14: Cross-page consistency check and polish

**Files:**
- Modify: Various pages as needed

**Step 1: Visual review of all pages**

Run `npm run dev` and review every page:
- Consistent header/footer
- Consistent color usage (navy #1e3a5f, teal #0d9488)
- All links work (no 404s)
- Mobile responsive on all pages
- No lorem ipsum or placeholder text left behind

**Step 2: Fix any issues found**

**Step 3: Final build**

```bash
npm run build
```

Verify no build errors.

**Step 4: Commit**

```bash
git add -A
git commit -m "fix: polish cross-page consistency and fix broken links"
```

---

### Task 15: Final commit and push

**Step 1: Review git log**

```bash
git log --oneline
```

Verify all commits are clean and descriptive.

**Step 2: Push to GitHub**

```bash
git remote add origin <repo-url>
git push -u origin main
```

**Step 3: Verify GitHub Pages deployment**

Check the Actions tab for successful deployment. Visit the deployed URL.

---

## Summary

| Phase | Tasks | Description |
|---|---|---|
| 1 — Scaffolding | 1-2 | Astro project, layout, navbar, footer |
| 2 — Primary Pages | 3-6 | Home, MCAT Prep, Medical Admissions, Sample Exam |
| 3 — Secondary Pages | 7-10 | University, Immigration, Blog, About |
| 4 — SEO & Deploy | 11-12 | SEO meta/sitemap, GitHub Actions |
| 5 — Report | 13 | Standalone market research HTML report |
| 6 — Polish | 14-15 | Consistency check, final push |

**Total: 15 tasks across 6 phases.**
