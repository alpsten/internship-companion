# Analytics

The app uses a lightweight internal analytics wrapper.

## What It Tracks

- page views
- resource opens
- resource downloads
- language changes
- theme changes
- plan task toggles

## Provider

The current implementation is Plausible-compatible.

If `window.plausible` is available, events are sent there.

If `VITE_PLAUSIBLE_DOMAIN` is set, the Plausible script is injected automatically.

## Environment Variables

- `VITE_PLAUSIBLE_DOMAIN`
- `VITE_PLAUSIBLE_API_HOST` (optional, defaults to `https://plausible.io`)

## Notes

- The analytics wrapper also dispatches browser `CustomEvent`s for local debugging and future provider changes.
- If no analytics provider is configured, the app still works normally.
