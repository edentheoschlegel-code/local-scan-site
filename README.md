# localscanapp.com

The site served at **localscanapp.com**. It is a landing page for Local Scan plus
the two pages the App Store listing has to point at.

**Local Scan is an iPhone and iPad app only.** The web version of the app is not
published here and is not published anywhere. This repository holds a landing
page, a privacy policy and a help page, and nothing else. There is no `app.js`,
no `styles.css` from the app, no service worker and no manifest, so nothing here
can be mistaken for the app or installed as one.

## What is in here

| File | What it is |
| --- | --- |
| `index.html` | The landing page. Written for this domain; it exists nowhere else. |
| `privacy.html` | The app's real privacy policy, copied from the app. |
| `support.html` | The app's real help page, copied from the app. |
| `theme-boot.js` | Copied from the app. Applies the theme before first paint. |
| `assets/` | Icons, favicons and the share image, copied from the app. |
| `CNAME`, `.nojekyll`, `robots.txt`, `sitemap.xml` | Hosting. |

## The one edit made to the copied pages

`privacy.html` and `support.html` are byte for byte the files that ship inside
the app, with a single change: `class="native"` on the `<html>` element.

Both pages were already written twice over. Statements that are true of a web
page and nothing else carry `.only-web`; the app truth carries `.only-ios`. In
the app, `theme-boot.js` sets `html.native` before paint when Capacitor is
present, and the CSS swaps one set for the other. On this domain there is no
Capacitor, and a visitor reading browser copy about an app that has no browser
version would be reading something untrue. Setting the class in the markup uses
the mechanism the pages already carry, needs no inline script (their Content
Security Policy forbids one) and does not depend on JavaScript running at all.

**Do not make that edit in the app source.** Inside the app the class has to
come from the Capacitor check, not from the markup.

## Keeping the copies honest

`privacy.html` and `support.html` belong to the app. When they change in
`Digital Products/EdenApps/Local Scan/`, copy them here again and reapply the
`class="native"` edit. Two documents claiming to be the same policy must not
drift apart.

## Hosting

GitHub Pages, from `main`, at the repository root. `CNAME` claims the custom
domain. DNS is at Cloudflare: the apex points at the four GitHub Pages
addresses, and `www` is a CNAME to the Pages host.

## License

Copyright (c) 2026 Eden Apps. All rights reserved.

This is not open-source software. Please do not copy, modify or redistribute it without written permission from Eden Apps. See `LICENSE`.
