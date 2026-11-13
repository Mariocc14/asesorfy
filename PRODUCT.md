# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS pages served by Vercel, plus Node serverless functions in `api/` (Stripe, Brevo, and from 2026-11-13 the Anthropic API). No framework or build step for pages. `vercel.json` holds redirects and headers. Each push to `main` deploys.

## What it is

Asesorfy (asesorfy.app) offers legal documents and free legal tools for businesses in Spain. It is information and self-service, not legal advice: there is no lawyer behind it (confirmed by Mario, 2026-11-13). Everything it produces carries that caveat.

## Users and jobs

- **Primary (from 2026-11-13):** small and mid-sized businesses, autónomos and online businesses in Spain without an in-house legal team. Typical jobs:
  - get the legal texts their website needs;
  - understand a contract before signing it;
  - turn legalese into plain Spanish.
- **Existing line: rental and property.** Landlords and small property owners. Rental contracts, the Kit Impago, a 30-minute orientation, about 50 blog guides and a profitability calculator. This line keeps its URLs and sales and moves out of the home into its own section (decision 2026-11-13).

## Capabilities

- Rental document generator with Stripe payment. The long-term contract is free in exchange for an email.
- Free tools (from 2026-11-13):
  - generators for a privacy policy, legal notice and cookie policy;
  - an AI contract reviewer;
  - an AI translator from legal text to plain language.
- AI tools show a free summary on screen. The full report goes by email and the address joins the Brevo list (decision 2026-11-13).
- Regulatory alerts by email (Brevo) and a contact form.

## Constraints

- No prices on the home (same rule as Sprintia, 2026-11-13). Prices stay on product pages.
- Never claim to be lawyers or to give legal advice. Say "información orientativa", never "asesoramiento jurídico".
- Spanish law (RGPD/LOPDGDD, LSSI-CE, LAU…), and the copy is written in Spanish from Spain.
- Owner: Mario Calvo Castillo, Córdoba. Contact: hola@asesorfy.app. Shared PostHog project 111470, filtered by site.
- No invented testimonials, customers or figures.

## Brand commitments

- Name and mark: Asesorfy wordmark with the blue accent (`brand.css`, `assets/asesorfy-mark.svg`).
- Voice: clear, close and precise; it explains the law the way you'd explain it to someone who runs a business.
