# Release Checklist

Use this before shipping changes to the site.

## Product

- Confirm the homepage message still matches the product: guided companion first, resources/templates as support.
- Check that every plan stage still has useful linked resources.
- Remove stale or time-bound language unless it is intentionally dynamic.
- Confirm ownership, contact info, and repo links are correct.

## Content

- Review new or edited copy in both Swedish and English.
- Make sure every resource solves one clear student problem.
- Check that every resource has a practical next step.
- Verify download labels and download files match.
- Open every resource in the modal and scan for broken formatting.

## UX

- Test the main journey: landing page -> `/plan` -> open recommended resource -> close modal -> continue.
- Test the resource library filters and featured downloads.
- Check language switching on every page.
- Check dark mode on every page.
- Check mobile layout for navigation, cards, and modal overflow.

## Accessibility

- Navigate the app with keyboard only.
- Confirm all interactive elements have visible focus states.
- Confirm the modal opens, traps focus, and closes with `Escape`.
- Check button labels and link text for clarity.
- Confirm color contrast remains readable in both themes.

## Routing And Links

- Test direct navigation to `/`, `/plan`, `/resources`, `/faq`, and `/about`.
- Test the production base path build if deploying under a repo subpath.
- Click every internal navigation link.
- Click every external link and `mailto:` link.
- Verify placeholder documentation cards are either published or still clearly marked as coming soon.

## Quality

- Run `npm run lint`
- Run `npm run build`
- Smoke test the production build locally with `npm run preview`

## Launch Decision

- What changed?
- What user problem got better?
- What remains intentionally unfinished?
- Is the change good enough to ship now?
