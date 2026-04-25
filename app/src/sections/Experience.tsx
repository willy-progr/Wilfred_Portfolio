'use client'

import { useEffect, useRef, useState } from 'react'
import { experience } from '@/data/siteContent'

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

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
      { threshold: 0.08 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="pt-6 pb-10 md:pt-8 md:pb-12 lg:pt-10 lg:pb-16"
    >
      <div className="max-w-content mx-auto px-5 md:px-6 lg:px-12">
        {/* Header */}
        <h2 className="fade-up font-display font-bold text-[26px] md:text-[32px] lg:text-[42px] text-text leading-tight tracking-[-0.02em] mb-5 md:mb-6">
          Work Experience
        </h2>

        {/* Cards — tighter gap */}
        <div className="flex flex-col gap-3">
          {experience.map((role, i) => {
            const isExpanded = expanded === role.id
            return (
              <div
                key={role.id}
                className="fade-up bg-surface border border-border rounded-card p-5 md:p-6 lg:p-7 card-hover"
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-4 md:gap-5">
                  {/* Number */}
                  <span className="font-body font-semibold text-sm text-accent lg:pt-1 w-6 md:w-8 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div>
                      <p className="font-body font-medium text-[11px] md:text-xs text-accent uppercase tracking-[0.06em]">
                        {role.company}
                      </p>
                      <h3 className="font-body font-semibold text-base md:text-lg text-text mt-1">
                        {role.title}
                      </h3>
                      <p className="font-body text-xs md:text-sm text-text-muted mt-0.5">
                        {role.period} · {role.location}
                      </p>
                    </div>

                    {/* Key bullets */}
                    <ul className="mt-3 md:mt-4 space-y-1.5 md:space-y-2">
                      {role.categories[0].bullets.slice(0, isExpanded ? undefined : 2).map((b, j) => (
                        <li key={j} className="font-body text-[13px] md:text-sm text-text-secondary leading-relaxed flex items-start gap-2.5 md:gap-3">
                          <span className="w-1 h-1 rounded-full bg-accent mt-1.5 md:mt-2 flex-shrink-0" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Expand / Collapse */}
                    {(role.categories.length > 1 || role.categories[0].bullets.length > 2) && (
                      <button
                        type="button"
                        onClick={() => setExpanded(isExpanded ? null : role.id)}
                        className="show-more-btn inline-flex items-center gap-1.5 font-body font-medium text-sm text-accent mt-3 md:mt-4"
                      >
                        {isExpanded ? 'Show less' : 'Show more'}
                        <svg 
                          width="14" 
                          height="14" 
                          viewBox="0 0 16 16" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                        >
                          <path d="M4 6l4 4 4-4"/>
                        </svg>
                      </button>
                    )}

                    {/* Expanded content */}
                    {isExpanded && (
                      <div className="mt-4 md:mt-5 space-y-4 md:space-y-5 animate-[fadeIn_0.3s_ease]">
                        {role.categories.slice(1).map((cat, ci) => (
                          <div key={ci}>
                            <h4 className="font-body font-semibold text-xs md:text-sm text-text uppercase tracking-[0.04em] mb-1.5 md:mb-2">
                              {cat.name}
                            </h4>
                            <ul className="space-y-1.5 md:space-y-2">
                              {cat.bullets.map((b, bi) => (
                                <li key={bi} className="font-body text-[13px] md:text-sm text-text-secondary leading-relaxed flex items-start gap-2.5 md:gap-3">
                                  <span className="w-1 h-1 rounded-full bg-accent mt-1.5 md:mt-2 flex-shrink-0" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {/* Show remaining bullets from first category */}
                        {role.categories[0].bullets.length > 2 && (
                          <div>
                            <ul className="space-y-1.5 md:space-y-2">
                              {role.categories[0].bullets.slice(2).map((b, bi) => (
                                <li key={bi} className="font-body text-[13px] md:text-sm text-text-secondary leading-relaxed flex items-start gap-2.5 md:gap-3">
                                  <span className="w-1 h-1 rounded-full bg-accent mt-1.5 md:mt-2 flex-shrink-0" />
                                  <span>{b}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
