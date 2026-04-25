'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-8 md:py-10">
      <div className="max-w-content mx-auto px-5 md:px-6 lg:px-12 flex flex-col items-center gap-3 md:flex-row md:items-center md:justify-between">
        <p className="font-body text-xs md:text-[13px] text-text-muted text-center md:text-left">
          &copy; {currentYear} Wilfred Kivinda
        </p>
        <p className="font-body text-xs md:text-[13px] text-text-muted text-center">
          Insights & Demand Planning Professional &middot; Nairobi, Kenya
        </p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="btn-pill-glow group flex items-center justify-center w-9 h-9 md:w-10 md:h-10 mt-1 md:mt-0"
          aria-label="Back to top"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#050810"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:-translate-y-0.5"
          >
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </button>
      </div>
    </footer>
  )
}
