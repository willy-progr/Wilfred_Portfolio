'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { useDataTheme } from '@/hooks/useDataTheme'
import { hero, stats, personal } from '@/data/siteContent'
import { downloadCvAsFile } from '@/lib/cvDownload'

const companiesTooltip = [
  { name: 'BAT', years: '3 Years' },
  { name: 'Tropical Heat', years: '1 Year' },
]

export default function Hero() {
  const theme = useDataTheme()
  const pillRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const dashboardRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const runReveal = () => {
      const items = [
        { ref: pillRef, delay: 0 },
        { ref: nameRef, delay: 100 },
        { ref: descRef, delay: 200 },
        { ref: ctaRef, delay: 300 },
        { ref: dashboardRef, delay: 360 },
        { ref: statsRef, delay: 480 },
      ]
      items.forEach(({ ref, delay }) => {
        if (ref.current) {
          ref.current.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
          ref.current.style.opacity = '1'
          ref.current.style.transform = 'translateY(0)'
        }
      })
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      [pillRef, nameRef, descRef, ctaRef, dashboardRef, statsRef].forEach((r) => {
        if (r.current) {
          r.current.style.opacity = '1'
          r.current.style.transform = 'none'
        }
      })
      return
    }

    // Never block on font loading: some browsers/networks can stall document.fonts.ready.
    const fonts =
      'fonts' in document && document.fonts && typeof document.fonts.ready !== 'undefined'
        ? document.fonts.ready
        : Promise.resolve()

    const timeout = new Promise<void>((resolve) => {
      window.setTimeout(() => resolve(), 2000)
    })

    void Promise.race([fonts, timeout]).then(runReveal)
  }, [])

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  const marketsTooltip = stats[1].markets

  return (
    <section id="hero" className="relative flex min-h-[min(100dvh,880px)] flex-col justify-center pt-20 pb-12 md:min-h-screen md:pt-16 md:pb-0">
      <div className="mx-auto w-full max-w-content px-5 md:px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-8 overflow-visible lg:grid-cols-2 lg:gap-10 xl:gap-14">
          <div className="max-w-3xl lg:max-w-none">
            <div ref={pillRef} className="mb-4 inline-flex translate-y-4 opacity-0 md:mb-6">
              <span className="rounded-pill border border-border bg-transparent px-3 py-1.5 font-body text-[10px] font-medium uppercase tracking-[0.08em] text-accent md:px-4 md:text-[11px]">
                {hero.overline}
              </span>
            </div>

            <h1 ref={nameRef} className="hero-name translate-y-6 opacity-0">
              {hero.nameLine1} {hero.nameLine2}
            </h1>

            <p
              ref={descRef}
              className="mt-4 max-w-[500px] translate-y-4 font-body text-sm leading-relaxed text-text-secondary opacity-0 md:mt-6 md:text-base"
            >
              {hero.subtitle}
            </p>

            <div ref={ctaRef} className="mt-6 flex flex-wrap items-center gap-3 translate-y-4 opacity-0 md:mt-8">
              <button
                type="button"
                onClick={() => scrollTo('#experience')}
                className="btn-pill-glow inline-flex items-center gap-2 px-5 py-2.5 font-body text-sm font-semibold md:px-7 md:py-3 md:text-[15px]"
              >
                View My Work
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollTo('#contact')}
                className="btn-pill-glow inline-flex items-center gap-2 px-5 py-2.5 font-body text-sm font-semibold md:px-7 md:py-3 md:text-[15px]"
              >
                Get In Touch
              </button>
            </div>
          </div>

          <div
            ref={dashboardRef}
            className="relative z-0 w-full min-w-0 max-w-2xl translate-y-5 opacity-0 lg:max-w-none lg:justify-self-end"
          >
            <div className="hero-mockup-float">
            <div
              className="pointer-events-none absolute -inset-4 -z-10 rounded-[1.6rem] bg-gradient-to-br from-accent/30 via-accent/[0.08] to-transparent opacity-80 blur-2xl sm:-inset-6 sm:rounded-[1.85rem]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -inset-0.5 -z-10 rounded-2xl bg-gradient-to-b from-border-light/50 via-border/30 to-border/20 opacity-90 sm:rounded-[1.25rem]"
              aria-hidden
            />
            <div
              className="pointer-events-none relative z-10 select-none w-full overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-b from-surface-elevated via-surface to-surface p-px shadow-2xl ring-1 ring-inset ring-border/35 sm:rounded-[1.25rem]"
            >
              <div className="overflow-hidden rounded-[0.9rem] bg-surface/60 sm:rounded-[1.15rem]">
              <Image
                key={theme}
                src={
                  theme === 'light'
                    ? '/images/africa-kpi-dashboard-light.png'
                    : '/images/africa-kpi-dashboard-dark.png'
                }
                alt="Africa Monthly KPIs analytics dashboard—preview of metrics, charts, and market search."
                width={1376}
                height={816}
                className="h-auto w-full max-w-full object-contain"
                sizes="(max-width: 1023px) 100vw, 50vw"
                priority
                draggable={false}
              />
              </div>
            </div>
            </div>
          </div>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4 mt-12 md:mt-16 lg:mt-20 pt-6 md:pt-8 border-t border-border opacity-0 translate-y-4"
        >
          <div className="group relative min-w-0">
            <p className="font-display font-bold text-[24px] md:text-[28px] lg:text-[32px] text-accent leading-none cursor-default">
              {stats[0].number}
            </p>
            <p className="font-body text-xs md:text-[13px] text-text-muted mt-1.5">{stats[0].label}</p>
            <div className="tooltip-popup absolute left-0 bottom-full z-50 mb-3 w-full max-w-[min(100%,220px)] md:left-auto md:right-0 md:w-[220px]">
              <div className="bg-surface border border-border-light rounded-card p-3.5 shadow-2xl sm:p-4">
                <p className="font-body font-semibold text-[11px] text-accent uppercase tracking-[0.06em] mb-2">
                  Experience Breakdown
                </p>
                <div className="space-y-2">
                  {companiesTooltip.map((c, j) => (
                    <div key={j} className="flex min-w-0 items-center justify-between gap-2">
                      <span className="min-w-0 shrink font-body text-[12px] text-text-secondary sm:text-[13px]">{c.name}</span>
                      <span className="shrink-0 font-body font-medium text-[12px] text-accent sm:text-[13px]">{c.years}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-border-light bg-surface md:left-auto md:right-8 md:translate-x-0" />
            </div>
          </div>

          <div className="group relative min-w-0">
            <p className="font-display font-bold text-[24px] md:text-[28px] lg:text-[32px] text-accent leading-none cursor-default">
              {stats[1].number}
            </p>
            <p className="font-body text-xs md:text-[13px] text-text-muted mt-1.5">{stats[1].label}</p>
            <div className="tooltip-popup absolute right-0 bottom-full z-50 mb-3 w-full max-w-[min(100%,220px)] md:w-[220px]">
              <div className="max-h-[min(70vh,320px)] overflow-y-auto overflow-x-hidden rounded-card border border-border-light bg-surface p-3.5 shadow-2xl sm:max-h-none sm:overflow-visible sm:p-4">
                <p className="font-body font-semibold text-[11px] text-accent uppercase tracking-[0.06em] mb-2">
                  Markets Covered
                </p>
                <div className="space-y-1">
                  {marketsTooltip?.map((m, j) => (
                    <span key={j} className="flex min-w-0 items-start gap-2 font-body text-[12px] text-text-secondary sm:text-[13px]">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                      <span className="min-w-0 break-words">{m}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-border-light bg-surface md:left-auto md:right-8 md:translate-x-0" />
            </div>
          </div>

          <div>
            <p className="font-display font-bold text-[24px] md:text-[28px] lg:text-[32px] text-accent leading-none">
              {stats[2].number}
            </p>
            <p className="font-body text-xs md:text-[13px] text-text-muted mt-1.5">{stats[2].label}</p>
          </div>

          <div className="flex items-start md:items-center">
            <a
              href={personal.cvPath}
              download={personal.cvFileName}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
                if (e.button !== 0) return
                e.preventDefault()
                void downloadCvAsFile(personal.cvPath, personal.cvFileName).catch(() => {
                  window.location.href = personal.cvPath
                })
              }}
              className="btn-pill-glow inline-flex items-center gap-2 font-body font-medium text-sm px-4 md:px-5 py-2 md:py-2.5"
            >
              <span className="hidden sm:inline">Download CV</span>
              <span className="sm:hidden">CV</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v10M4 9l4 4 4-4"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
