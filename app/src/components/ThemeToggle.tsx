'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'portfolio-theme'

type Theme = 'light' | 'dark'

function readThemeFromDom(): Theme {
  if (typeof document === 'undefined') return 'dark'
  const t = document.documentElement.getAttribute('data-theme')
  return t === 'light' || t === 'dark' ? t : 'dark'
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setTheme(readThemeFromDom())
    setMounted(true)
  }, [])

  const apply = useCallback((next: Theme) => {
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
    document.documentElement.setAttribute('data-theme', next)
    setTheme(next)
  }, [])

  const toggle = useCallback(() => {
    apply(theme === 'dark' ? 'light' : 'dark')
  }, [apply, theme])

  if (!mounted) {
    return (
      <div
        className="h-7 w-12 flex-shrink-0 rounded-full border border-border/50 bg-surface/50 shadow-inner"
        aria-hidden
      />
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggle}
      className={[
        'group relative h-7 w-12 flex-shrink-0 rounded-full p-0.5 shadow-sm ring-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
        isDark
          ? 'bg-zinc-500 ring-zinc-600/30'
          : 'bg-zinc-300 ring-zinc-400/50',
      ].join(' ')}
    >
      <span
        className={[
          'absolute top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-200 ease-out will-change-transform',
          isDark ? 'left-0.5 translate-x-0' : 'left-0.5 translate-x-5',
        ].join(' ')}
      >
        {isDark ? (
          <MoonIcon className="h-3 w-3 text-zinc-900" />
        ) : (
          <SunIcon className="h-3 w-3 text-amber-500" />
        )}
      </span>
    </button>
  )
}
