# Cupy Coffee Bar — Project Guide

Static, single-page bilingual (Georgian / English) marketing site for **ქაფი • cupy** coffee bar in Tbilisi. Deployed to Vercel at `cupy.ge`.

## Stack

- **No build pipeline.** Plain HTML, CSS, vanilla JS. Edit files, push, Vercel serves them.
- Hosting config: [vercel.json](vercel.json) (`cleanUrls: true` only).
- Fonts: `New Hero` self-hosted as `/fonts/new-hero.woff2` (file is *not in repo* — see [fonts/README.txt](fonts/README.txt)) with `Noto Sans Georgian` from Google Fonts as fallback.

## Structure

| Path | Purpose |
|---|---|
| [index.html](index.html) | The entire site — one page, all sections. ~470 lines. |
| [css/style.css](css/style.css) | Source CSS — readable, commented. |
| [css/style.min.css](css/style.min.css) | Minified CSS — **what `index.html` actually loads**. |
| [js/script.js](js/script.js) | Source JS — language switching, mobile menu, scroll reveal, sticky nav. |
| [js/script.min.js](js/script.min.js) | Minified JS — **what `index.html` actually loads**. |
| [sitemap.xml](sitemap.xml), [robots.txt](robots.txt), [llms.txt](llms.txt) | SEO / crawler files. |
| [favicon/](favicon/), [images/og-cover.png](images/og-cover.png) | Brand assets. |

## Critical rules

### 1. Minified assets must stay in sync with sources

`index.html` loads `style.min.css` and `script.min.js`, **not** the unminified versions. Editing only `style.css` or `script.js` will silently have no effect in production.

When you change [css/style.css](css/style.css) or [js/script.js](js/script.js), regenerate the minified twin in the same commit. There's no minifier configured in the repo — minify manually (whitespace + comment stripping is enough; the existing `.min` files are conservative). Or just edit both files in lockstep for small changes.

### 2. Menu changes touch four places

The menu exists in **four** locations that must agree on items and prices:

1. Visible HTML menu rows in [index.html](index.html) under `<section id="menu">` (~line 262 onward).
2. Schema.org `CoffeeShop` JSON-LD `hasMenu.hasMenuSection` block (~line 53–150).
3. `<noscript>` fallback price summary (~line 165–175).
4. FAQ answers + Schema.org `FAQPage` JSON-LD that quote prices (~line 405–446).

When prices change, grep for the old price (e.g. `7 ₾`, `"7","priceCurrency"`) and update every hit. Use the `menu-sync` subagent for non-trivial menu changes.

### 3. Bilingual content uses paired `data-ka` / `data-en` attributes

Translation is client-side: [js/script.js:30](js/script.js#L30) reads `data-{lang}` and replaces `textContent`. Default visible text is Georgian.

Every translatable element needs **both** `data-ka` and `data-en`. The visible inner text should match the `data-ka` value (since `ka` is the default). Adding only one side breaks the language toggle silently for that element.

Use the `i18n-check` subagent to verify parity after edits.

### 4. Class names are intentionally short

CSS uses 2–4 character class names (`mi`, `mp`, `gi`, `ai`, `ac`, `mg`, `mgt`, `mh`, `lg`, `lm`, `li`, `rv`, `ctn`, `sp`, `sl`, `st`, `sd`). This is deliberate for payload size — don't "improve readability" by renaming them. New classes should follow the same convention.

## SEO contract

This site is heavily SEO-tuned for both Georgian and English search. Don't casually edit:

- `<title>`, `<meta name="description">`, `<meta name="keywords">` ([index.html:9-11](index.html#L9-L11))
- `og:*` and `twitter:*` tags
- `hreflang` links (`ka`, `en`, `x-default`)
- Both JSON-LD blocks (`CoffeeShop` schema and `FAQPage` schema)
- [sitemap.xml](sitemap.xml) `<lastmod>` should be bumped when content changes

If you change the menu, business hours, address, or phone, update them in:
- [index.html](index.html) (visible + JSON-LD + `<noscript>`)
- [llms.txt](llms.txt)
- The `geo.position` / `ICBM` meta tags only if the location actually moved

## Business facts (single source of truth)

- **Address:** 148 Davit Guramishvili Ave, Tbilisi, Georgia (`41.715437, 44.7928223`)
- **Phone:** +995 501 100 148
- **Email:** contact@cupy.ge
- **Hours:** Mon-Thu 10:00–22:00 · Fri 10:00–00:00 · Sat-Sun 11:00–22:00
- **Socials:** Instagram `cupy.coffeebar`, Facebook `coffee.moves.friendship`, TikTok `@coffee.moves.friendship`

## Local preview

No dev server needed. Open [index.html](index.html) directly in a browser, or run `python3 -m http.server 8000` from the repo root for a quick local URL (matters for `?lang=en` URL-param testing and font loading).

## Subagents available

- **menu-sync** — Apply a menu/price change across HTML, JSON-LD, noscript fallback, and FAQ in one pass.
- **i18n-check** — Audit `data-ka`/`data-en` parity and flag mismatches.
