'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Hero from '@/sections/Hero'
import SkillsMarquee from '@/sections/SkillsMarquee'
import About from '@/sections/About'
import Experience from '@/sections/Experience'
import Contact from '@/sections/Contact'
import { initAnalytics } from '@/lib/analytics'

export default function Home() {
  useEffect(() => {
    initAnalytics()
  }, [])

  return (
    <main id="main-content" className="relative z-10" tabIndex={-1}>
      <Header />
      <Hero />
      <SkillsMarquee />
      <About />
      <Experience />
      <Contact />
      <Footer />
    </main>
  )
}
