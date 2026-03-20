# Project Plan

This is the internal product and execution plan for the web app.

## Product Positioning

Internship Companion is a guided companion for LIA and internship students.

The core experience is:

1. Break the search into small, calm, actionable steps.
2. Give students support exactly when they need it.
3. Pair each step with resources, templates, and downloads that help them execute.

Resources are not the product on their own. They support the guided journey.

## Current Product Shape

- Landing page explains the mindset and intent.
- Plan flow breaks the journey into stages.
- Resources page provides guides, templates, and trackers.
- Modal lets users read resources without losing context.
- Downloads support tracking and reflection offline.
- Locale switching supports Swedish and English.

## Next Priorities

### 1. Make The Product Story Sharper

- Update homepage and plan copy so the relationship between plan and resources is obvious.
- Make “guided companion first, resource library second” consistent across the site.

### 2. Improve Accessibility

- Add proper focus management to the resource modal.
- Review keyboard navigation across the main flows.
- Localize accessibility labels such as close buttons and modal descriptions.

### 3. Centralize Site Metadata

- Move repo URL, contact email, site name, and ownership text into one config file.
- Avoid hardcoding public-facing metadata inside page components.

### 4. Add Lightweight Analytics

- Track page visits for core pages.
- Track resource opens.
- Track download clicks.
- Track language switches.
- Track completion progress in the plan flow at an aggregated level only.

### 5. Publish Contributor Docs

- Product brief
- Content outline
- MDX workflow
- Release checklist

### 6. Strengthen Content Operations

- Define what makes a resource “done”.
- Keep resources timeless unless a date is essential.
- Make sure every stage has enough support material.

## Definition Of Done For A Feature

- Solves a real student problem.
- Fits the guided companion positioning.
- Works in Swedish and English, or has a clear fallback.
- Works on mobile and desktop.
- Passes lint and build.
- Has been checked against the release checklist.

## Open Questions

- Which analytics stack should be used?
- Should downloads remain static files only, or become editable in-app tools later?
- Should the onboarding docs live inside the site, the repo, or both?
