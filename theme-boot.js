/* Local Scan — early theme application (runs before <body> paints to avoid a
 * flash). Loaded blocking in <head>. Reads localStorage "localscan.theme"
 * ("light" | "dark" | "system"; unset ⇒ system) and sets data-theme on <html>.
 * The full toggle wiring + matchMedia live-update listener lives in app.js.
 *
 * Shared by index.html AND the static pages (privacy, support, 404), which is
 * what makes those pages follow the theme chosen IN THE APP rather than only
 * the OS. Those pages load no other script, so this file is also what keeps
 * their single theme-color tag in step — see paintThemeColor below. */
"use strict";
(function () {
  // Marks the document when it is running inside the Capacitor iOS shell, so
  // privacy.html and support.html can show the native truth in place of the
  // browser truth (.only-ios / .only-web). The sibling apps do this with an
  // inline <script> in the page head; these pages carry their own CSP with
  // script-src 'self', which forbids inline script — so the same job is done
  // from this file, which they already load blocking, before first paint.
  //
  // Deliberately not testing hostname === "localhost" (the Local PDF sibling
  // does): that would mark an ordinary local http server as native and show the
  // wrong copy whenever the web build is checked.
  try {
    var native = (window.Capacitor && typeof window.Capacitor.isNativePlatform === "function" && window.Capacitor.isNativePlatform())
      || location.protocol === "capacitor:";
    if (native) document.documentElement.className += " native";
  } catch (e) {}

  var KEY = "localscan.theme";
  var pref;
  try { pref = localStorage.getItem(KEY); } catch (e) { pref = null; }
  var effective;
  if (pref === "light" || pref === "dark") {
    effective = pref;
  } else {
    // "system" or unset → follow the OS preference.
    effective = (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
  }
  document.documentElement.setAttribute("data-theme", effective);
  // The ONE <meta name="theme-color">, written before first paint so the
  // browser bar never shows the wrong surface for a frame. Media-gated tags
  // cannot do this job: they follow the OS, not an in-app override, so someone
  // on a light OS who picked Dark got a white bar over a dark page. On the app
  // page app.js re-writes this tag on every theme change; on the static pages,
  // which load nothing else, this is the only writer. Values are the light and
  // dark --bg, matching THEME_COLOR in app.js.
  try {
    var m = document.getElementById("themeColorMeta");
    if (m) m.setAttribute("content", effective === "dark" ? "#15161a" : "#f7f7fb");
  } catch (e) {}
})();
