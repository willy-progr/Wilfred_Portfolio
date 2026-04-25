'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * The portfolio has no /dashboard. Chrome (or bookmarks) may open this URL
 * by mistake; send visitors to the real home page.
 */
export default function DashboardRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/')
  }, [router])
  return (
    <p className="p-4 text-center text-sm text-text-secondary" aria-live="polite">
      Taking you to the home page…
    </p>
  )
}
