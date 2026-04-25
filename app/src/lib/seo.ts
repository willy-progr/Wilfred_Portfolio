/**
 * SEO Service — Constructs metadata and JSON-LD structured data
 * Uses content-service data to generate page metadata.
 */

import { personal, site } from '@/data/siteContent'

const defaultKeywords = [
  'Wilfred Kivinda',
  'demand planning',
  'business intelligence',
  'Power BI',
  'Nielsen',
  'Kantar',
  'forecasting',
  'Nairobi',
  'Kenya',
  'S&OP',
  'IBP',
  'data analytics',
] as const

export function generatePageMetadata() {
  const title = site.name
  const description = site.description
  const url = site.url
  const ogImage = new URL(site.ogImage, url).toString()

  return {
    title: {
      default: title,
      template: '%s | Wilfred Kivinda',
    },
    description,
    keywords: [...defaultKeywords, personal.title, 'portfolio'],
    metadataBase: new URL(url),
    authors: [{ name: personal.name, url: site.url }],
    creator: personal.name,
    applicationName: personal.name,
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${personal.name} — ${personal.title}`,
        },
      ],
      locale: 'en_KE',
      type: 'website' as const,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url,
    },
    manifest: '/site.webmanifest',
    appleWebApp: {
      title: personal.name,
      capable: true,
      statusBarStyle: 'default' as const,
    },
    formatDetection: {
      telephone: true,
    },
  }
}

const personId = () => `${site.url}#person`
const websiteId = () => `${site.url}#website`

export function generatePersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId(),
    name: personal.name,
    jobTitle: personal.title,
    url: site.url,
    email: personal.email,
    telephone: personal.phoneRaw,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nairobi',
      addressCountry: 'KE',
    },
    worksFor: [
      {
        '@type': 'Organization',
        name: 'British American Tobacco',
        url: 'https://www.bat.com',
      },
    ],
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'ALX',
        url: 'https://www.alxafrica.com',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Moringa School',
        url: 'https://moringaschool.com',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Masinde Muliro University of Science & Technology',
      },
    ],
    knowsLanguage: ['English', 'Swahili'],
    sameAs: personal.linkedIn ? [personal.linkedIn] : undefined,
  }
}

export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId(),
    name: site.name,
    description: site.description,
    url: site.url,
    inLanguage: 'en-KE',
    author: { '@id': personId() },
    publisher: { '@id': personId() },
  }
}

export function generateWebPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${site.url}#webpage`,
    name: site.name,
    description: site.description,
    url: site.url,
    inLanguage: 'en-KE',
    isPartOf: { '@id': websiteId() },
    about: { '@id': personId() },
    mainEntity: { '@id': personId() },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: new URL(site.ogImage, site.url).toString(),
    },
  }
}
