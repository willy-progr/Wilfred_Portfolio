import type { Metadata, Viewport } from 'next'
import { Manrope, Outfit } from 'next/font/google'
import {
  GOOGLE_SITE_VERIFICATION,
  generatePageMetadata,
  generatePersonJsonLd,
  generateWebPageJsonLd,
  generateWebsiteJsonLd,
} from '@/lib/seo'
import './globals.css'

/** Geometric display for hero and numerals; humanist grotesk for all UI and long copy. */
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  adjustFontFallback: true,
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  adjustFontFallback: true,
})

export const metadata: Metadata = generatePageMetadata()

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#d8dbe5' },
    { media: '(prefers-color-scheme: dark)', color: '#06080d' },
  ],
}

const themeInitScript = `(function(){try{var k='portfolio-theme';var t=localStorage.getItem(k);if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}else{document.documentElement.setAttribute('data-theme','dark');}}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const personJsonLd = generatePersonJsonLd()
  const websiteJsonLd = generateWebsiteJsonLd()
  const webPageJsonLd = generateWebPageJsonLd()

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${outfit.variable}`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <meta name="google-site-verification" content={GOOGLE_SITE_VERIFICATION} />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;0,6..96,600;0,6..96,700;1,6..96,400;1,6..96,500&display=swap"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
        />
      </head>
      <body className="text-text min-h-svh">
        <a className="skip-link sr-only" href="#main-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
