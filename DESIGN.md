---
name: Asesorfy
description: Legal documents and free legal tools for businesses in Spain, explained in plain Spanish.
colors:
  ink: "#0e1a2b"
  ink-soft: "#1d2a3d"
  muted: "#56627a"
  line: "#e3e8ef"
  line-2: "#d3dbe6"
  bg: "#ffffff"
  bg-soft: "#f6f8fb"
  bg-tint: "#eef3fb"
  accent: "#1f5fa6"
  accent-dark: "#163f6e"
  accent-soft: "#dbe7f6"
  ok: "#1d7a52"
  warn: "#b54708"
  bad: "#b42318"
  mark: "#fff2b8"
  foot-text: "#9fb0c6"
  on-ink-accent: "#8fb6e6"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(36px, 6vw, 64px)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(32px, 4.6vw, 50px)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.012em"
  section:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(26px, 3.4vw, 38px)"
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: "-0.012em"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "17px"
    fontWeight: 600
    lineHeight: 1.25
  lede:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(16.5px, 1.8vw, 19px)"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "13.5px"
    fontWeight: 600
    lineHeight: 1.4
  wordmark:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "21px"
    fontWeight: 750
    lineHeight: 1
    letterSpacing: "-0.045em"
rounded:
  sheet: "6px"
  sm: "8px"
  control: "10px"
  card: "14px"
  panel-lg: "16px"
  feature: "18px"
  pill: "999px"
spacing:
  gutter: "24px"
  container: "1120px"
  card-pad: "22px"
  panel-pad: "24px"
  grid-gap: "22px"
  section-y: "72px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.bg}"
    rounded: "{rounded.control}"
    padding: "14px 22px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.accent-dark}"
  button-ghost:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.accent}"
    rounded: "{rounded.control}"
    padding: "14px 22px"
  button-ghost-hover:
    backgroundColor: "{colors.bg-soft}"
  input-field:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "11px 13px"
  search-ask:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel-lg}"
    padding: "8px 8px 8px 18px"
  chip:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "8px 14px"
  badge:
    backgroundColor: "{colors.bg-tint}"
    textColor: "{colors.accent}"
    rounded: "{rounded.pill}"
    padding: "5px 10px"
  panel:
    backgroundColor: "{colors.bg}"
    rounded: "{rounded.card}"
    padding: "{spacing.panel-pad}"
  feature-tool:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.foot-text}"
    rounded: "{rounded.feature}"
    padding: "28px"
  document-sheet:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.sheet}"
    padding: "34px 36px"
  disclaimer:
    backgroundColor: "{colors.bg-tint}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.card}"
    padding: "16px 20px"
  footer:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.foot-text}"
---

# Design System: Asesorfy

## Overview

**Creative North Star: "The Clear Desk"**

Asesorfy looks like a tidy, well-lit desk where someone has already laid out the paper you need. The ground is white and cool blue-grey. Sea-ink navy carries the text and the one dark block per page. Asesorfy blue is reserved for actions. Headings are set in Fraunces, a warm editorial serif, so the law reads as something written by a person. Everything you operate (fields, buttons, labels, lists) is set in Inter. The system is calm and fairly dense, the way a good form is dense. Generous section rhythm keeps it from feeling bureaucratic.

The world has two physical materials. **Interface** is the white cards, fields and tinted bands. **Paper** is the legal text itself: a near-square sheet with a long, low shadow that holds the generated document, or a clause card quoting a contract. A yellow highlighter (`mark`) is the only warm colour. It marks the words that matter: search matches, risky phrases in a clause, the values a generator filled in.

This document records the shared stylesheet (`assets/site.css`) and the wordmark (`brand.css`) as built for the business home, the tools shelf and the five tool pages. Older pages (the rental home `alquiler.html`, blog guides, `generador.html`) carry the same tokens inline, with small drift (line `#e6eaf0`, muted `#5b6776`). For new work, the values below are normative.

**Key Characteristics:**
- White and cool-tint ground, navy ink, a single blue for action.
- Fraunces for every heading, Inter for every control and every line of body text.
- Soft, cool, navy-tinted shadows. No hard edges, no glow.
- A paper sheet for legal output, a highlighter for emphasis.
- Exactly one dark navy block per page (the feature tool, the lead shelf item) plus the navy footer.

## Colors

A restrained palette: cool neutrals carry about 90% of every screen, one blue does the work, and a highlighter yellow adds the only warmth.

### Primary
- **Asesorfy Blue** (accent): primary buttons, links in body copy, the focus ring, the caret, checkbox accent, icon tiles, the `+` on FAQ rows, the arrow on list rows. It matches the blue of the wordmark's "fy" accent.
- **Deep Harbour Blue** (accent-dark): hover state of primary buttons only.
- **Mist Blue** (accent-soft): text selection, and the border of the disclaimer box.

### Neutral
- **Sea Ink** (ink): headings, primary text, the footer ground, the dark feature card and the lead shelf item.
- **Soft Ink** (ink-soft): field labels, secondary copy inside documents and lists, nav links at rest.
- **Slate** (muted): ledes, hints, descriptions under titles, breadcrumbs.
- **Hairline** (line) and **Firm Hairline** (line-2): card borders and dividers. Use line-2 for input strokes and dashed empty states.
- **Paper White** (bg), **Cool Wash** (bg-soft) and **Blue Wash** (bg-tint). Cool Wash is for alternating section bands, hover fills and table headers. Blue Wash is for icon tiles, badges, the disclaimer and the loading shimmer.
- **Footer Slate** (foot-text) and **Lit Blue** (on-ink-accent): text and the wordmark accent on the navy ground.

### Semantic
- **Ok green**, **Warn amber** and **Bad red** (ok, warn, bad) appear only as risk and verdict signals: badge text on pale tints (`#e8f3ee`, `#fff4e5`, `#fdecea`), the check icons in a page's facts row, and "Riesgo alto" or "Falta" notes in clause previews. They are never decoration.
- **Highlighter** (mark): see the Highlighter Rule.

### Named Rules
**The One Blue Rule.** Asesorfy Blue is the only chromatic action colour. Every button, link and focus state uses it. A second accent hue is never introduced for buttons or links.

**The Highlighter Rule.** Yellow appears only as `mark` over words that matter in text. It is never a background block, a button or a border.

**The One Dark Block Rule.** Each page gets at most one navy surface above the footer: the featured tool or the lead tool on the shelf. That surface marks the most important tool, so a second one cancels it out.

## Typography

**Display Font:** Fraunces (optical size 9–144, weights 500 and 600), falling back to Georgia.
**Body Font:** Inter (400, 500, 600 and 700), falling back to system-ui, -apple-system, Segoe UI and Roboto.

**Character:** Fraunces gives each question and title a warm voice, like a clear human explanation. Inter keeps forms and lists neutral and exact.

### Hierarchy
- **Display**: home question desk only. Centred, balanced wrap, slightly tighter tracking than other headings.
- **Headline**: the H1 on tool and inner pages, left aligned. Its lede is capped near 640px.
- **Section**: section H2s. The paragraph under it uses Slate at 17px, with the head block capped at 680px.
- **Title**: Fraunces at 17–19px for card, list and shelf titles (the guide list, related cards, tool rows, the shelf). Fieldset legends use 18px Fraunces. Panel H2s use 21px.
- **Body**: Inter at 15–17px, line-height 1.6, with pretty wrapping. Documents inside the sheet use 14px.
- **Label**: 13.5px Inter 600 for field labels. Optional hints sit inside the label as `small` text in Slate, weight 400.
- **Footer column heads**: 13px Inter 600 in uppercase, tracked 0.08em, white on navy. This is the only uppercase label in the shared system.

### Named Rules
**The Serif Speaks, The Sans Works Rule.** Fraunces is used for anything that is said: headings, titles, legends, quoted clauses. Inter is used for anything that is operated or read in bulk: buttons, fields, nav, body text. Buttons are never set in the serif.

**The Balanced Heading Rule.** Every H1–H3 uses `text-wrap: balance` and line-height 1.12. Paragraphs use `text-wrap: pretty`.

## Layout

Content sits in a single centred container with a 1120px maximum and 24px gutters. Sections breathe on a 72px vertical rhythm, with a few deliberate exceptions: the desk uses 76/56px, and the tools-home block starts 64px from the top. Alternate sections use a Cool Wash band edged with hairlines top and bottom. That band is the main way the page is divided. Section heads cap near 680px. FAQs cap at 780px.

Grids are two-up or three-up, with gaps of 12–22px inside components and 40px between text and a companion block (stance, rental, contact). Tool pages use a two-column workspace with a 22px gap: the form panel on the left, and the paper sheet on the right, sticky 86px from the top. The home desk narrows to 860px and centres everything.

Breakpoints, as built: the nav collapses into a menu button at 860px. Workspaces and paired grids stack at 900px. Three-up grids (steps, related cards) stack at 820px. Paired fields and check grids stack at 560px, and panels tighten to 18px padding there. Sheet tables reflow into labelled cards at 560px. The search field drops its leading icon at 560px.

**The Stack-Don't-Shrink Rule.** On narrow screens, columns stack. Type and controls do not shrink below their mobile sizes: inputs stay at 16px or larger, and the search input at 17px.

## Elevation & Depth

Depth is soft and cool. Every shadow is tinted with Sea Ink, never pure black, and most combine a 1–2px contact line with a long, negatively spread ambient fall. Interface surfaces sit just above the page. Paper sits higher, which makes it read as a separate document.

### Shadow Vocabulary
- **Card** (`0 1px 2px rgba(14,26,43,.05), 0 12px 30px -12px rgba(14,26,43,.18)`): form panels, the search dropdown and the mobile nav sheet.
- **Paper** (`0 1px 0 rgba(14,26,43,.04), 0 28px 60px -30px rgba(14,26,43,.35)`): the generated-document sheet.
- **Search lift** (`0 2px 0 rgba(14,26,43,.03), 0 26px 50px -28px rgba(14,26,43,.4)`): the home search field. On focus it adds a 4px Asesorfy Blue ring at 14% opacity.
- **Feature fall** (`0 30px 60px -34px rgba(14,26,43,.6)`): the dark feature card.
- **Action glow** (`0 6px 16px -6px rgba(31,95,166,.55)`): primary buttons only. It is a soft blue underglow, not an offset block.

### Named Rules
**The Paper Floats Rule.** Legal output (the document sheet, the clause card) sits on the deepest, longest shadow and uses the smallest radius (6–10px). Interface surfaces stay shallower and rounder.

**The Lift-On-Hover Rule.** Linked cards respond to hover with a 2–3px upward move and a border shift to `#b8cce5`. Buttons lift by 1px. No other hover motion exists.

## Shapes

Corners are gently rounded and graduated by role. Paper is the squarest at 6px. Small tiles use 8px and controls use 10px. Cards and panels use 14px, the search field and list cards 16px, and the large home blocks (feature tool and tool list) 18px. Chips, badges and tallies are full pills. Icon tiles are rounded squares, 30–44px across with 8–12px corners, and are never circles. Borders are 1px hairlines. The only dashed lines are empty states and the note divider inside a clause card.

## Components

### Buttons
- **Shape:** soft rectangle with a 10px radius (11px inside the search field). Text is Inter 600 at 15px, with an 8px gap to any trailing 18px line icon.
- **Primary:** Asesorfy Blue with white text, padded 14px 22px, with the action glow.
- **Hover / Focus:** hover darkens to Deep Harbour Blue and lifts 1px over 150ms. Focus shows the global 3px ring at 35% Asesorfy Blue with a 2px offset.
- **Ghost:** white with blue text and an inset 1px Firm Hairline. Hover fills it with Cool Wash. The small variant pads 10px 16px at 14px. Disabled buttons drop to 55% opacity.

### Chips
- **Style:** white pill with a hairline border and Soft Ink text in Inter 500 at 14px. Chips sit centred under the search field as suggestions.
- **State:** hover turns the border and text Asesorfy Blue. Chips trigger a search and are never filters with a selected state.

### Badges
- Pills at 12.5px, weight 700 and uppercase, tracked 0.04em. Blue Wash with blue text by default. Risk levels use green, amber or red text on matching pale tints. Badges are used only for verdicts and risk levels.

### Cards / Containers
- **Panel:** white, hairline border, 14px radius, card shadow, 24px padding (18px on small screens). Panels hold tool forms and lead-capture forms.
- **Linked card** (related tools, shelf items): white, hairline border, 14–16px radius, no shadow at rest. Lifts on hover.
- **List card** (tool list, rental list): one bordered, rounded container with rows divided by hairlines. Rows fill with Cool Wash on hover.
- **Lock / capture card:** hairline border with a gradient from white down to Blue Wash. It holds the email capture for full AI reports and the "¿Te avisamos si cambia la ley?" alert.
- **Disclaimer:** Blue Wash with a Mist Blue border at 13.5px. It appears on every tool page and states "Información orientativa".
- **Empty state:** dashed Firm Hairline on Cool Wash, with a numbered how-to list.

### Inputs / Fields
- **Style:** white field with a 1px Firm Hairline stroke and a 10px radius. Text is Inter at 16px, padded 11px 13px. The label sits above the field.
- **Focus:** the border turns Asesorfy Blue and a 3px ring at 15% blue appears. No outline.
- **Segmented control:** a Cool Wash track with a 3px inset. The selected option becomes a white pill with a small shadow.
- **Check rows:** each checkbox sits in its own bordered tile with a 10px radius, and the checkbox uses the blue accent.
- **Error:** Bad red text at 14px under the form.

### Navigation
- A sticky bar 66px tall, white at 90% opacity with a saturated blur, over a hairline bottom border. Links are Inter 500 at 15px in Soft Ink, each a 9px-rounded hit area that fills with Cool Wash on hover and on `aria-current`. The bar ends with one primary button.
- Below 860px, a 42px Cool Wash square menu button opens a full-width white sheet. The sheet lists links divided by hairlines, with the primary button full width at the bottom.
- The wordmark is the Asesorfy mark at 32px (29px on mobile) beside "Asesor" in ink and "fy" in Asesorfy Blue. The text is Inter 750 with tight tracking. On navy, the "fy" turns Lit Blue.

### Question Desk (signature)
The home hero is a search field rather than a pitch. It sits in a centred band with a vertical gradient from `#fbfcfe` to Blue Wash. The field is a large white rounded bar (16px radius, 1.5px Firm Hairline, search lift) with a muted line icon, a 19px Inter 500 input and a primary button inside it. Answers drop below it in a card-shadow list that animates in over 180ms (`cubic-bezier(.16,1,.3,1)`) and responds to the keyboard. Each answer row has a tinted icon tile coloured by kind: blue for tools, green for documents. Matched words carry the highlighter.

### Document Sheet (signature)
The output of every generator is a paper sheet: white, hairline border, 6px radius, paper shadow. It sets the document in 14px text with Fraunces headings, and holds bordered tables with Cool Wash header cells. When a field updates, the changed text flashes the highlighter and fades over 1.2s. A row of buttons above the sheet offers copy and download: one primary, the rest ghost.

### Clause Card
A white Fraunces excerpt of a contract with a small numbered reference. The risky phrase is highlighted. Under a dashed divider, a sans note opens with a red or amber bold verdict. It is used to preview the reviewer and translator tools.

## Do's and Don'ts

### Do:
- **Do** take every colour, radius and shadow from the `:root` tokens in `assets/site.css`, and from `brand.css` for the wordmark. Don't copy the drifted inline values from older pages.
- **Do** set every heading, card title and legend in Fraunces 600, and every control in Inter.
- **Do** show legal output on the paper sheet, and mark the important words with the highlighter.
- **Do** close every tool page with the Blue Wash disclaimer stating that the content is orientative information.
- **Do** use line icons (stroke SVG, 16–22px) in rounded-square tiles for tools and answers.
- **Do** honour `prefers-reduced-motion`. The build disables every animation and transition under it.

### Don't:
- **Don't** add a second action colour, or use the semantic green, amber or red outside verdicts and checks.
- **Don't** use more than one navy block per page above the footer.
- **Don't** use hard offset shadows, pure-black shadows or coloured glows other than the primary button's blue underglow.
- **Don't** put small uppercase tracked labels (eyebrows or kickers) above headings. The new surfaces open sections directly with the Fraunces heading.
- **Don't** use initials or letter glyphs in place of icons. Icons are line SVGs.
- **Don't** shrink form inputs below 16px on mobile.
