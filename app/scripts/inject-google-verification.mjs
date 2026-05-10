/**
 * Ensures Search Console HTML-tag verification is present in static export.
 * Keep content in sync with `src/lib/seo.ts` → `GOOGLE_SITE_VERIFICATION`.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '..', 'out')
const META =
  '<meta name="google-site-verification" content="Nm-lgw5hXV1dmgOen6YuhzIkIFbJPuClzQH7dQMa69k"/>'

function injectFile(filePath) {
  if (!fs.existsSync(filePath)) return false
  let html = fs.readFileSync(filePath, 'utf8')
  /* RSC payload can mention the name in JSON; require the real tag. */
  if (html.includes('<meta name="google-site-verification"')) return false
  const lower = html.toLowerCase()
  const idx = lower.indexOf('<head>')
  if (idx === -1) {
    console.warn(`inject-google-verification: no <head> in ${filePath}`)
    return false
  }
  const insertAt = idx + '<head>'.length
  html = html.slice(0, insertAt) + META + html.slice(insertAt)
  fs.writeFileSync(filePath, html, 'utf8')
  console.log(`inject-google-verification: updated ${path.relative(OUT, filePath)}`)
  return true
}

const rootIndex = path.join(OUT, 'index.html')
injectFile(rootIndex)
