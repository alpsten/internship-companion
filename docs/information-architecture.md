# Information Architecture & Wireframe Notes

## Site Map (MVP)
- **/ (Landing)** – Introduces the checklist, highlights benefits, invites users to start.
- **/plan** – Guided onboarding that helps students set goals and tick the first preparation tasks.
- **/resources**
  - **Guides** (LinkedIn, GitHub, CV, Interview, Rejection, Mindset)
  - **Templates** (email, LinkedIn message, call script, follow-up)
  - **Trackers** (application log, progress checklist, calendar reminders)
- **/about** – Explains project background, credits, and how to contribute.
- **/en/** (future) – English-language mirror once localisation is ready.

## Global Navigation
- Header: logo/title, links to Plan, Resources, About, language toggle placeholder.
- Utility: "Download Starter Pack" button that bundles top templates.
- Footer: quick links to FAQ, GitHub repo, contact, social proof quotes.

## Layout Patterns
- **Top hero** with short motivational statement and CTA.
- **Accordion sections** for dense guidance (preparation, networking, outreach).
- **Checklist component** with progress bar and local storage persistence.
- **Resource cards** showing type (Guide/Template/Tracker) with quick actions.
- **Quote blocks** for mindset reminders.

## Wireframe Notes
### Landing (`/`)
1. **Hero** – headline + subtext + primary CTA (`Kom igång`), secondary link to Resources.
2. **How it helps** – three columns: Prepare, Reach Out, Track Progress.
3. **Checklist preview** – embedded sample of the first few tasks with checkboxes.
4. **Testimonials/Mindset** – rotating quotes ("Du behöver bara ett JA").
5. **Download section** – buttons for PDF checklist, spreadsheet, email templates.
6. **FAQ teaser** – top three questions with expanders, link to full section.

### Plan (`/plan`)
- **Step indicator** across the top (1. Förberedelser → 2. Nätverk → 3. Outreach → 4. Intervjuer → 5. Momentum).
- **Left column**: collapsible checklist grouped by step.
- **Right column**: contextual tips + CTA to relevant resources (e.g., "Behöver du LinkedIn-hjälp? Läs guiden").
- **Progress summary**: completion percentage and streak counter.

### Resources (`/resources`)
- **Filter bar**: tabs for Guides, Templates, Trackers.
- **Resource cards**: title, short description, target use case, `Läs` / `Ladda ner` buttons.
- **Featured downloads**: highlight the most important assets (e.g., Outreach log spreadsheet).
- **FAQ anchor** at the bottom for quick answers.

### Resource Detail (Modal/Page)
- **Hero**: title, estimated read time, last updated.
- **Content body**: sections rendered from markdown (use accordions where needed).
- **Action bar**: button to copy template / download PDF / add to checklist.
- **Reflection prompt**: open question to encourage thinking.

### About (`/about`)
- Mission statement, link to `docs/`, contributor info, how to suggest updates.

## Component Inventory (MVP)
- NavigationBar, Footer, CTAButton
- Checklist (grouped items, progress meter)
- Accordion, Tabs, QuoteBlock
- ResourceCard, ResourceModal
- DownloadButton (with icon for file type)

## Localization Strategy (Preview)
- Store copy in JSON (`sv-SE`, `en-US`).
- Provide context keys (e.g., `hero.title`, `checklist.prepare.task1`).
- Leave language toggle disabled until translations are ready; display "Engelska kommer snart" tooltip.

## Content Management
- Author content in markdown/MDX files within `content/` (to be created).
- Frontmatter to tag: `type` (guide/template/tracker), `audience`, `stage`, `download` references.
- Static generation: Next.js or Vite + Contentlayer to parse MDX for GitHub Pages compatibility.

## Accessibility & Tone Notes
- Ensure accordion and checklist components are keyboard navigable.
- Use Swedish default copy with inclusive language.
- Maintain short paragraphs and clear headings for readability.

## Open Decisions
- Choose between Next.js static export vs. Vite + React Router for GitHub Pages deployment.
- Decide on local storage schema for checklist state.
- Determine file formats for downloads (host in `/public/downloads`).
