# MDX Workflow

The frontend loads content pages from `web/src/content/resources/*.mdx`. Each MDX file is a guide, template or tracker that can be rendered in the modal on the site.

## Structure
```mdx
---
title: "LinkedIn-guide"
type: "Guide"        # Guide | Mall | Tracker
summary: "Kort beskrivning som syns i kortet."
slug: "linkedin-guide"
stage: "prepare"      # Optional context tag
order: 1               # Sort order in card list
---

## Rubrik i innehållet
Själva innehållet skrivs i Markdown. Vanliga element (rubriker, listor, kodblock) fungerar direkt.
```

### Frontmatter fields
| Field          | Required | Purpose |
|---------------|----------|---------|
| `title`        | ✅        | Visas i kortet, modalen och rekommendationsknappar. |
| `type`         | ✅        | "Guide", "Mall" eller "Tracker" – styr märkning/färg. |
| `summary`      | ✅        | Kort text i resurskortet. |
| `slug`         | ✅        | Unik identifierare som används när plan-steg ska länka till resursen. |
| `order`        | ✅        | Håller resurserna i en bestämd ordning i listor. |
| `stage`        | ➖        | Metadata (t.ex. `prepare`, `network`, `outreach`, `interviews`, `momentum`). |
| `downloadLabel`| ➖        | Text för nedladdningsknappen (visas i modal och kort). |
| `downloadUrl`  | ➖        | Länk till fil (lägg resurser i `web/public/downloads/` eller extern länk). |
| `locale`       | ➖        | `sv` (default) eller `en`. Använd `en` för engelska utkast. |

## Lägga till en ny resurs
1. Skapa en fil i `web/src/content/resources/` (använd bara gemener och bindestreck i filnamnet).
2. Fyll i frontmatter och skriv innehållet i Markdown.
3. Om resursen hör till en plan-steg, lägg till `resourceSlug` i `planStages` i `web/src/content.ts` så att den dyker upp som rekommendation i Plan-läget.
4. Starta dev-servern – Vite plockar upp filen automatiskt och resurskortet syns direkt.

> 📁 Lägg lokala filer under `web/public/downloads/`. De byggs automatiskt in i statiska sajten och du kan länka med `downloadUrl: "downloads/filnamn.pdf"`.

## MDX tips
- Kodblock skrivs med ``` (backticks) och renderas med mörk bakgrund i modalen.
- Använd korta stycken och listor – långa textväggar blir tunga i modalen.
- För mallar, behåll placeholder-text inom hakparenteser (`[ditt namn]`) så det är tydligt var användaren ska ändra.
- För återkommande innehåll, bryt upp med `##` rubriker så man kan skumma snabbt.

## Förhandsgranska
`npm run dev` (eller `pnpm --filter internship-checklist-web dev`) uppdaterar innehållet live. Öppna resurskortet på startsidan eller via plan-steg för att se ändringarna direkt.
