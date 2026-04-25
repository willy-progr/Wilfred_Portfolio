'use client'

import { useEffect, useRef } from 'react'
import { about } from '@/data/siteContent'

const iconMap: Record<string, React.ReactNode> = {
  chart: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18"/>
      <path d="m19 9-5 5-4-4-3 3"/>
    </svg>
  ),
  zap: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  ),
  trending: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 7h-7v-2h9v9h-2z"/>
      <path d="M16 11v-2h-3v3h-3v3H7v2H4v3h16v-9h-4z"/>
      <path d="M2 17h.01"/>
      <path d="M2 21h.01"/>
    </svg>
  ),
  pie: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83"/>
      <path d="M22 12A10 10 0 0 0 12 2v10z"/>
    </svg>
  ),
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.querySelectorAll('.fade-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="pt-12 pb-6 md:pt-14 md:pb-8 lg:pt-16 lg:pb-10"
    >
      <div className="max-w-content mx-auto px-5 md:px-6 lg:px-12">
        {/* Header */}
        <h2 className="fade-up font-display font-bold text-[26px] md:text-[32px] lg:text-[42px] text-text leading-tight tracking-[-0.02em] mb-5 md:mb-6">
          {about.heading}
        </h2>

        {/* Cards — tighter gap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {about.cards.map((card, i) => (
            <div
              key={i}
              className="fade-up bg-surface border border-border rounded-card p-5 md:p-6 card-hover group"
            >
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent icon-pulse mb-3 md:mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                {iconMap[card.icon]}
              </div>
              <h3 className="font-body font-semibold text-[15px] md:text-base text-text leading-snug">
                {card.title}
              </h3>
              <p className="font-body text-[13px] md:text-sm text-text-secondary leading-relaxed mt-2 md:mt-2.5">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
