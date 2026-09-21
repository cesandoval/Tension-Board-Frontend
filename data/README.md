# DATA

Reference dumps of the Tension Board climb database. Nothing in the app imports
these at build time or fetches them at runtime.

They live here rather than in `static/` on purpose: Nuxt copies everything under
`static/` into `dist/`, so keeping these two files there added ~69 MB to every
Firebase Hosting deploy for no benefit.

If you ever do need one of them in the browser, import it from a page or plugin
so webpack can bundle/split it, rather than moving it back to `static/`.
