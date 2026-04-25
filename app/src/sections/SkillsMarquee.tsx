'use client'

import { skillsMarquee } from '@/data/siteContent'

const row1 = [...skillsMarquee.slice(0, 9), ...skillsMarquee.slice(0, 9)]
const row2 = [...skillsMarquee.slice(9), ...skillsMarquee.slice(0, 6), ...skillsMarquee.slice(9), ...skillsMarquee.slice(0, 6)]

const delay = (i: number, step = 0.11) => ({ animationDelay: `${(i * step) % 2.2}s` })

export default function SkillsMarquee() {
  return (
    <section className="py-3 md:py-4 border-y border-border overflow-hidden marquee-fade-left">
      {/* Row 1 — scrolls left */}
      <div className="marquee-track flex mb-2.5 md:mb-3">
        <div className="marquee-content flex gap-2.5 md:gap-3 animate-marquee">
          {row1.map((skill, i) => (
            <span
              key={i}
              style={delay(i)}
              className="inline-flex items-center whitespace-nowrap bg-surface border border-border text-text-secondary font-body text-xs md:text-sm px-3.5 py-2 md:px-5 md:py-2.5 rounded-pill will-change-transform motion-reduce:animate-none animate-skill-drift cursor-default transition-[border-color,color,box-shadow,transform] duration-300 ease-out shadow-sm hover:border-accent hover:text-accent hover:shadow-[0_0_20px_-6px_var(--accent-glow)]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      {/* Row 2 — scrolls right */}
      <div className="marquee-track flex">
        <div className="marquee-content flex gap-2.5 md:gap-3 animate-marquee-reverse">
          {row2.map((skill, i) => (
            <span
              key={i}
              style={delay(i, 0.14)}
              className="inline-flex items-center whitespace-nowrap bg-surface border border-border text-text-secondary font-body text-xs md:text-sm px-3.5 py-2 md:px-5 md:py-2.5 rounded-pill will-change-transform motion-reduce:animate-none animate-skill-drift-slow cursor-default transition-[border-color,color,box-shadow,transform] duration-300 ease-out shadow-sm hover:border-accent hover:text-accent hover:shadow-[0_0_20px_-6px_var(--accent-glow)]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
