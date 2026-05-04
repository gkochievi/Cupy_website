New Hero font family — sourced from fonnts.com (via Penguyn/Penguyn.github.io).

Available .otf weights (each available with a matching *-italic.otf):

- new-hero-hairline.otf
- new-hero-thin.otf
- new-hero-ultralight.otf
- new-hero-light.otf
- new-hero-regular.otf
- new-hero-medium.otf
- new-hero-semibold.otf
- new-hero-bold.otf
- new-hero-extrabold.otf
- new-hero-super.otf

Currently used by:
- links.html: super + super-italic (loaded via @font-face inline in the page)

Note for index.html:
The main stylesheet (css/style.css line 26-29) still references new-hero.woff2 — that
file is not in this directory yet. Either drop a converted woff2 in here, or update
the @font-face to point at one of the .otf files above (e.g. new-hero-regular.otf).
