/**
 * Analytics Service — Minimal, opt-in, privacy-minded analytics
 * Only loads when NEXT_PUBLIC_ANALYTICS_ID is set.
 * Tracks page views and section visibility (no cookies, no personal data).
 */

const ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID
const isEnabled = typeof window !== 'undefined' && !!ANALYTICS_ID

interface AnalyticsEvent {
  type: 'pageview' | 'section_view' | 'cta_click'
  page?: string
  section?: string
  ctaName?: string
  timestamp: number
  url: string
}

function sendEvent(event: AnalyticsEvent) {
  if (!isEnabled) return

  // Send to analytics endpoint or console in development
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('[Analytics]', event)
    return
  }

  // In production, send to your analytics endpoint
  // This is a stub — wire it to your preferred analytics platform
  const payload = {
    ...event,
    id: ANALYTICS_ID,
  }

  // Use sendBeacon for reliable delivery on page unload
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics', JSON.stringify(payload))
  } else {
    fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify(payload),
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
    }).catch(() => {
      // Silently fail — analytics should never break the app
    })
  }
}

export function trackPageView() {
  if (!isEnabled) return
  sendEvent({
    type: 'pageview',
    page: window.location.pathname,
    timestamp: Date.now(),
    url: window.location.href,
  })
}

export function trackSectionView(sectionId: string) {
  if (!isEnabled) return
  sendEvent({
    type: 'section_view',
    section: sectionId,
    timestamp: Date.now(),
    url: window.location.href,
  })
}

export function trackCTAClick(ctaName: string) {
  if (!isEnabled) return
  sendEvent({
    type: 'cta_click',
    ctaName,
    timestamp: Date.now(),
    url: window.location.href,
  })
}

export function initAnalytics() {
  if (!isEnabled) return
  trackPageView()
}
