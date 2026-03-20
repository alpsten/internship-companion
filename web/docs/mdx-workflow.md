# MDX Workflow

Use this when adding or updating a resource in the library.

## 1. Create The Resource File

Add a new `.mdx` file in:

- `src/content/resources/`

## 2. Add Frontmatter

Each resource needs:

- `title`
- `type`
- `summary`
- `slug`
- `stage`
- `order`

Optional fields:

- `downloadLabel`
- `downloadUrl`
- `locale`

## 3. Write The Content

Keep the content:

- short enough to use immediately
- concrete
- aligned with one stage in the journey
- free from stale dates unless the date is intentionally variable

## 4. Link It To The Plan

If the resource should appear from the guided plan:

- add the resource slug to the relevant `resourceSlugs` list in `src/content.ts`
- optionally attach the slug directly to a task via `resourceSlug`

## 5. Add Downloads If Needed

If the resource has a downloadable file:

- place the file in `public/downloads/`
- reference it through `downloadLabel` and `downloadUrl`

## 6. Check Both Languages

If the resource should exist in both Swedish and English:

- create both variants
- keep the same slug
- set `locale: "en"` in the English version

## 7. Verify

- Open the resource from the resource library
- Open it from the relevant plan stage if linked there
- Check formatting in the modal
- Check downloads
- Run `npm run lint`
- Run `npm run build`
