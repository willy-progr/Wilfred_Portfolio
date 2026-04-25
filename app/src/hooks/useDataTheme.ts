'use client'

import { useLayoutEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function readTheme(): Theme {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
}

export function useDataTheme() {
  const [theme, setTheme] = useState<Theme>('dark')

  useLayoutEffect(() => {
    setTheme(readTheme())
    const el = document.documentElement
    const obs = new MutationObserver(() => setTheme(readTheme()))
    obs.observe(el, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])

  return theme
}
