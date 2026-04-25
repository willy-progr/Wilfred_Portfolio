'use client'

import { useState, useEffect } from 'react'
import ThemeToggle from '@/components/ThemeToggle'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setMobileOpen(false)
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3 }
    )

    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s))
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
    }
  }, [])

  const handleClick = (href: string) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-[background,border,box-shadow] duration-300 ${
        scrolled
          ? 'border-b border-border/90 bg-[var(--header-bg)] shadow-[0_1px_0_rgba(0,0,0,0.04)] backdrop-blur-xl backdrop-saturate-150'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-content mx-auto h-full flex items-center justify-between gap-3 px-5 md:px-6 lg:px-12">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="flex min-w-0 items-center gap-2 flex-shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-accent flex-shrink-0" aria-hidden>
            <rect x="0.5" y="0.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1"/>
            <rect x="10.5" y="0.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1"/>
            <rect x="0.5" y="10.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1"/>
            <rect x="10.5" y="10.5" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1"/>
          </svg>
          <span className="hero-name-compact whitespace-nowrap">
            <span className="hidden sm:inline">WILFRED KIVINDA</span>
            <span className="sm:hidden">WK</span>
          </span>
        </a>

        <nav className="hidden md:flex min-w-0 flex-1 items-center justify-end gap-4 py-1 md:gap-6 lg:gap-8" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleClick(link.href) }}
              className={`shrink-0 font-body text-sm transition-colors duration-200 ${
                activeSection === link.href.slice(1)
                  ? 'text-text'
                  : 'text-text-secondary hover:text-text'
              }`}
            >
              {link.label}
            </a>
          ))}
          <span className="shrink-0 pl-0.5 sm:pl-1">
            <ThemeToggle />
          </span>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="btn-pill-glow flex min-h-[40px] min-w-[40px] flex-col items-center justify-center gap-1 p-2"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span className={`block h-[1.5px] w-5 bg-[#050810] transition-all duration-300 ${mobileOpen ? 'translate-y-[5px] rotate-45' : ''}`} />
            <span className={`block h-[1.5px] w-5 bg-[#050810] transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-[1.5px] w-5 bg-[#050810] transition-all duration-300 ${mobileOpen ? '-translate-y-[5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-16 z-40 flex flex-col items-center justify-center gap-8 bg-bg/98 backdrop-blur-xl md:hidden"
          role="dialog"
          aria-modal="true"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleClick(link.href) }}
              className="font-body text-xl text-text-secondary transition-colors hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
