'use client'

import { useEffect, useRef, useState } from 'react'
import { personal, contact } from '@/data/siteContent'
import { submitContactForm } from '@/lib/contact'

type ChannelVariant = 'email' | 'call' | 'linkedin' | 'whatsapp'

/** Muted tints — color lives in the icon + hover accent, not full pill fills */
/** Channel hues follow CSS vars so light/dark both stay legible (no hardcoded tailwind on paper). */
const CHANNEL_ICON: Record<ChannelVariant, string> = {
  email: 'text-[color:var(--ch-email)]',
  call: 'text-[color:var(--ch-call)]',
  linkedin: 'text-[color:var(--ch-linkedin)]',
  whatsapp: 'text-[color:var(--ch-whatsapp)]',
}

function QuickChannelIcon({ variant }: { variant: ChannelVariant }) {
  const common = 'h-[15px] w-[15px] shrink-0 md:h-4 md:w-4'
  switch (variant) {
    case 'email':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      )
    case 'call':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    case 'whatsapp':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      )
  }
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', website: '' })
  const [attachment, setAttachment] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            section.querySelectorAll('.fade-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await submitContactForm(form)
      setSuccess(true)
      setForm({ name: '', email: '', subject: '', message: '', website: '' })
      setAttachment(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0])
    }
  }

  const quickChannels: {
    variant: ChannelVariant
    href: string
    label: string
    external?: boolean
    ariaLabel?: string
  }[] = [
    { variant: 'email', href: `mailto:${personal.email}`, label: 'Email Me', external: false },
    {
      variant: 'call',
      href: `tel:${personal.phoneRaw}`,
      label: 'Call',
      external: false,
      ariaLabel: `Call ${personal.phone}`,
    },
    { variant: 'linkedin', href: personal.linkedIn, label: 'LinkedIn', external: true },
    { variant: 'whatsapp', href: personal.whatsapp, label: 'WhatsApp', external: true },
  ]

  return (
    <section ref={sectionRef} id="contact" className="pt-10 pb-12 md:pt-12 md:pb-16 lg:pt-16 lg:pb-20">
      <div className="max-w-content mx-auto px-5 md:px-6 lg:px-12">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 border-b border-border/60 pb-8 md:mb-10 md:flex-row md:items-end md:justify-between md:gap-8 md:pb-10">
          <div className="fade-up max-w-xl space-y-2">
            <h2 className="font-display text-[26px] font-bold leading-tight tracking-[-0.02em] text-text md:text-[32px] lg:text-[42px]">
              {contact.heading}
            </h2>
            <span className="block h-1 w-10 rounded-pill bg-accent/80" aria-hidden />
          </div>
          <p className="fade-up max-w-md font-body text-sm leading-relaxed text-text-secondary text-pretty md:max-w-[min(100%,24rem)] md:text-right md:text-[15px]">
            {contact.body}
          </p>
        </div>

        {/* Quick contact — calm pills, accent on hover; icons keep a hint of color */}
        <div className="fade-up mb-10 md:mb-12">
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
            {quickChannels.map((item) => (
              <a
                key={item.href + item.label}
                href={item.href}
                className="group flex min-h-[48px] w-full items-center justify-start gap-3 rounded-pill border border-border bg-surface/95 px-4 py-2.5 text-left text-xs font-medium text-text transition-[border-color,background-color,box-shadow,color,transform] duration-200 ease-out motion-reduce:transition-none md:px-5 md:py-2.5 md:text-sm hover:-translate-y-px hover:border-accent hover:bg-surface-elevated hover:shadow-sm motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                aria-label={item.ariaLabel}
              >
                <span
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-border/60 bg-surface-light/50 transition-[border-color,background-color,color] duration-200 group-hover:border-accent/40 group-hover:bg-accent/5 group-hover:text-accent ${CHANNEL_ICON[item.variant]}`}
                  aria-hidden
                >
                  <QuickChannelIcon variant={item.variant} />
                </span>
                <span className="min-w-0 text-left font-body leading-snug text-text-secondary transition-colors group-hover:text-accent">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Card */}
        <div className="fade-up max-w-[680px] mx-auto lg:max-w-[720px]">
          <div className="overflow-hidden rounded-[16px] border border-border bg-surface shadow-[var(--shadow-elevated)] ring-1 ring-text/[0.06] md:rounded-[20px]">
            {/* Card Header */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-[var(--accent-dim)] via-transparent to-transparent px-5 py-5 md:gap-4 md:px-8 md:py-6">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-on-accent shadow-[0_0_24px_-6px_var(--accent-glow)] md:h-9 md:w-9">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-body font-semibold text-sm md:text-base text-text">{contact.formTitle}</h3>
                <p className="font-body text-xs md:text-[13px] text-text-secondary">{contact.formSubtitle}</p>
              </div>
            </div>

            {/* Form */}
            <div className="border-t border-border/60 bg-surface-elevated/95 p-5 md:p-8">
              {success ? (
                <div className="text-center py-8 md:py-10">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <svg className="text-accent" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  </div>
                  <h3 className="font-body font-semibold text-base md:text-lg text-text">Message Sent</h3>
                  <p className="font-body text-xs md:text-sm text-text-secondary mt-2">{contact.successMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  {/* Honeypot */}
                  <div className="hidden" aria-hidden="true">
                    <input type="text" name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
                  </div>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                    <div>
                      <label htmlFor="c-name" className="block font-body font-medium text-[11px] uppercase tracking-[0.08em] text-text-muted mb-1.5 md:mb-2">Name *</label>
                      <input id="c-name" type="text" name="name" value={form.name} onChange={handleChange} required
                        className="w-full rounded-[10px] border border-border bg-surface-light px-3.5 py-3 font-body text-sm text-text shadow-[var(--input-shadow),var(--shadow-inset)] placeholder:text-text-muted transition-[border,box-shadow] duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-[var(--ring-focus)] md:px-4 md:py-3.5"
                        placeholder="Your full name" autoComplete="name" />
                    </div>
                    <div>
                      <label htmlFor="c-email" className="block font-body font-medium text-[11px] uppercase tracking-[0.08em] text-text-muted mb-1.5 md:mb-2">Email *</label>
                      <input id="c-email" type="email" name="email" value={form.email} onChange={handleChange} required
                        className="w-full rounded-[10px] border border-border bg-surface-light px-3.5 py-3 font-body text-sm text-text shadow-[var(--input-shadow),var(--shadow-inset)] placeholder:text-text-muted transition-[border,box-shadow] duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-[var(--ring-focus)] md:px-4 md:py-3.5"
                        placeholder="your@email.com" autoComplete="email" />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="c-subject" className="block font-body font-medium text-[11px] uppercase tracking-[0.08em] text-text-muted mb-1.5 md:mb-2">Subject *</label>
                    <input id="c-subject" type="text" name="subject" value={form.subject} onChange={handleChange} required
                      className="w-full rounded-[10px] border border-border bg-surface-light px-3.5 py-3 font-body text-sm text-text shadow-[var(--input-shadow),var(--shadow-inset)] placeholder:text-text-muted transition-[border,box-shadow] duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-[var(--ring-focus)] md:px-4 md:py-3.5"
                      placeholder="What's this about?" />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="c-message" className="block font-body font-medium text-[11px] uppercase tracking-[0.08em] text-text-muted mb-1.5 md:mb-2">Message *</label>
                    <textarea id="c-message" name="message" value={form.message} onChange={handleChange} required rows={5}
                      className="w-full resize-y rounded-[10px] border border-border bg-surface-light px-3.5 py-3 font-body text-sm text-text shadow-[var(--input-shadow),var(--shadow-inset)] placeholder:text-text-muted transition-[border,box-shadow] duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-[var(--ring-focus)] md:px-4 md:py-3.5"
                      placeholder="Tell me more about your inquiry..." />
                  </div>

                  {/* File Attachment */}
                  <div>
                    <label className="block font-body font-medium text-[11px] uppercase tracking-[0.08em] text-text-muted mb-1.5 md:mb-2">
                      Attachments <span className="normal-case text-text-muted/60">(optional · max 5 MB)</span>
                    </label>
                    <label className="flex cursor-pointer items-center gap-3 rounded-[10px] border border-dashed border-border bg-surface-light px-3.5 py-2.5 shadow-[inset_0_1px_0_rgba(0,0,0,0.04)] transition-[border,box-shadow] duration-200 hover:border-border-light focus-within:border-accent focus-within:ring-2 focus-within:ring-[var(--ring-focus)] md:px-4 md:py-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted">
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                      </svg>
                      <span className="font-body text-xs md:text-sm text-text-secondary truncate">
                        {attachment ? attachment.name : 'Attach files'}
                      </span>
                      <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg" />
                    </label>
                  </div>

                  {error && <p className="font-body text-sm text-danger">{error}</p>}

                  <button type="submit" disabled={submitting}
                    className="btn-pill-glow flex w-full items-center justify-center gap-2 px-6 py-3 font-body text-sm font-semibold sm:w-auto md:px-8 md:py-3.5 md:text-[15px]">
                    {submitting ? 'Sending...' : contact.submitButton}
                    {!submitting && (
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 8h10M9 4l4 4-4 4"/>
                      </svg>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
