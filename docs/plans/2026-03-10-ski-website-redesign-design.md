# SKI Education Website Redesign + Market Report — Design Document

**Date:** 2026-03-10
**Status:** Approved

## Overview

Two deliverables for the SKI Education internship project:
1. A standalone PDF-ready market research report
2. A redesigned website built with Astro + Tailwind, deployed to GitHub Pages

## Decisions

- **Site scope:** MCAT prep and medical admissions are primary. University admissions and immigration services are secondary pages.
- **Tech stack:** Astro + Tailwind CSS. Static site, no backend.
- **Report format:** Standalone HTML document styled for PDF export (print via browser).
- **MCAT sample exam:** Both an interactive client-side quiz (10-15 questions) AND a downloadable sample paper.
- **Deployment:** GitHub Pages via Astro static adapter.

---

## Deliverable 1: Market Research Report

Standalone HTML document with print-optimized CSS for PDF export.

### Sections

1. **Executive Summary** — Key findings and strategic recommendations
2. **Current State Analysis** — Audit of existing medicaleducationskiedu.com site: brand inconsistency (7+ brand name variants), spelling errors, mixed audience messaging, email-based booking flow, vague MCAT program description, minimal social proof
3. **Local Market Pivot Strategy** — Canadian pre-med market sizing (~17,000 MCAT test-takers/year in Canada), why local focus is the right move, competitive landscape
4. **MCAT Program Enhancement Recommendations** — Structured mock exams, MCAT-style past papers, performance analytics, admissions guidance, comparison with competitors (Princeton Review, Kaplan, Blueprint MCAT)
5. **International Expansion Research** — China (Gaokao-to-MCAT pipeline), Russia, Gulf region markets. MCAT as globally administered exam (~90,000+ international test-takers). 200,000+ international student market
6. **Website & Brand Strategy** — Audience segmentation (local vs international), conversion funnels, SEO, outcome-driven messaging, value propositions
7. **Competitive Analysis** — What opposition companies do: pricing models, content strategy, social proof, student outcomes
8. **Recommendations & Next Steps** — Prioritized action items with measurable KPIs

---

## Deliverable 2: Website

### Tech Stack

- **Framework:** Astro (static site generator)
- **Styling:** Tailwind CSS
- **Interactive quiz:** Vanilla JS, questions stored in JSON
- **Deployment:** GitHub Pages via `@astrojs/node` or static adapter
- **Package manager:** npm

### Site Map

| Page | Route | Priority | Purpose |
|---|---|---|---|
| Home | `/` | Primary | Hero with MCAT focus, value props, testimonials, CTAs |
| MCAT Prep | `/mcat-prep` | Primary | Program details, curriculum, pricing, tutor credentials |
| Medical Admissions | `/medical-admissions` | Primary | Caribbean med school pathway, admissions consulting |
| Sample Exam | `/sample-exam` | Primary | Interactive quiz + downloadable sample paper |
| University Admissions | `/university-admissions` | Secondary | International university placement |
| Immigration Services | `/immigration` | Secondary | Visa and PR support |
| Blog | `/blog` | Secondary | Template/placeholder for future content |
| About & Contact | `/about` | Secondary | Team, mission, contact form, WhatsApp link |

### Design System

- **Colors:** Navy (#1e3a5f) primary, white background, teal (#0d9488) accent, warm gray text
- **Typography:** Inter or system font stack for body, bold headings
- **Layout:** Mobile-first responsive, max-width container
- **Components:** Hero sections, feature cards, testimonial carousel, pricing table, FAQ accordion, CTA buttons

### Interactive MCAT Quiz

- 10-15 sample questions across MCAT sections (Bio, Chem, Physics, Psych, CARS)
- Multiple choice with 4 options each
- Client-side scoring with answer explanations on reveal
- Progress bar and final score summary
- Questions stored in a JSON file for easy editing

### Downloadable Sample Paper

- HTML page with print-optimized CSS
- Styled to look like a formal exam paper
- Download button triggers browser print dialog
- Same questions as the interactive quiz (different presentation)

### SEO Strategy

- Semantic HTML5 elements
- Meta titles and descriptions per page
- Open Graph tags for social sharing
- Structured data (Organization, Course, FAQs)
- Sitemap.xml generation
- Descriptive URLs and heading hierarchy

### What We Are NOT Building

- No login/auth system
- No payment processing (CTAs link to email or external booking at skiinc.ca)
- No CMS — content lives in Astro components/markdown
- No blog content migration (template only)
- No analytics (can be added later via script tag)

---

## Current Site Issues (from audit)

| Issue | Severity |
|---|---|
| No consistent brand name (7+ variants) | High |
| Multiple typos and grammar errors | High |
| MCAT prep buried on MD Admissions page alongside Caribbean med content | High |
| Booking via raw Gmail address — no conversion funnel | High |
| No tutor/advisor credentials shown | High |
| Wix platform limits custom UX | Medium |
| Course pages have no descriptions (CA$2,000 ARDMS with no details) | Medium |
| Community groups essentially empty (1-2 members) | Low |
| Blog has no author bios | Low |
| Only 1 testimonial visible | Medium |
