/**
 * Content Service — Single Source of Truth
 * All content derived strictly from Wilfred Kivinda's resume.
 */

export const personal = {
  name: 'Wilfred Kivinda',
  title: 'Insights & Demand Planning Professional',
  location: 'Nairobi, Kenya',
  email: 'kivindawilfred@outlook.com',
  phone: '+254 741 702 108',
  phoneRaw: '+254741702108',
  linkedIn: 'https://www.linkedin.com/in/wilfred-kivinda-a722071b4/',
  whatsapp: 'https://wa.me/254741702108',
  /** Add PDF under `app/public/cv/{cvFileName}` (served as `/cv/...`) */
  cvPath: '/cv/Wilfred_kivinda_Resume.pdf',
  cvFileName: 'Wilfred_kivinda_Resume.pdf',
}

export const hero = {
  overline: 'INSIGHTS & DEMAND PLANNING PROFESSIONAL',
  nameLine1: 'WILFRED',
  nameLine2: 'KIVINDA',
  subtitle:
    'Data & Insights professional with expertise in business performance reporting, demand planning, and data-driven storytelling, translating complex multi-market data into actionable insights that inform strategic decision-making.',
  ctaPrimary: 'View My Work',
  ctaSecondary: 'Get In Touch',
}

export const stats = [
  { number: '4+', label: 'Years Experience' },
  { number: '9', label: 'Markets Covered', markets: ['Kenya','South Africa','Nigeria','Somalia','Rwanda','Uganda','Zambia','Mauritius','Angola'] },
  { number: '90%+', label: 'Forecast Accuracy' },
]

export const about = {
  overline: 'ABOUT',
  heading: 'What I Offer',
  cards: [
    {
      icon: 'chart',
      title: 'Business Performance Intelligence',
      body: 'Turn complex, multi-market data into clear, decision-ready insights. I help businesses track performance, identify gaps, and understand what’s driving results across regions, products, and channels—so leaders can act with confidence.',
    },
    {
      icon: 'zap',
      title: 'Analytics & Reporting Automation',
      body: 'Replace manual reporting with streamlined, automated dashboards and workflows. I design efficient reporting systems using tools like Power BI and Excel to deliver faster insights, improve accuracy, and free up time for higher-value analysis.',
    },
    {
      icon: 'trending',
      title: 'Demand Forecasting & Scenario Modelling',
      body: 'Build reliable forecasts and test “what-if” scenarios to support smarter planning. From short-term demand to long-range projections, I help businesses anticipate risks, optimize inventory, and make proactive decisions in uncertain environments.',
    },
    {
      icon: 'pie',
      title: 'Market & Pricing Analytics',
      body: 'Understand your market, competition, and pricing dynamics. I analyze market share, pricing trends, and distribution performance to uncover growth opportunities, strengthen positioning, and guide commercial strategy.',
    },
  ],
}

export const skillsMarquee = [
  'Power BI', 'Advanced Excel', 'Nielsen Discover', 'Kantar Explorer',
  'SQL', 'Python', 'Reporting Automation', 'KPI Dashboards',
  'Demand Planning', 'S&OP / IBP', 'Forecasting', 'Scenario Modelling',
  'Data Governance', 'Stakeholder Engagement', 'Cross-Functional Collaboration',
  'Nielsen Analytics', 'Market Analytics', 'Pricing Strategy',
]

export const experience = [
  {
    id: 'insights-analyst',
    company: 'British American Tobacco (BAT)',
    title: 'Insights & Information Analyst',
    period: '03/2025 – Present',
    location: 'Nairobi',
    type: 'Current',
    categories: [
      {
        name: 'Business Performance Reporting & Insights Leadership',
        bullets: [
          'Lead the end-to-end delivery of business performance reporting across South Africa, Kenya and Nigeria markets, providing clear, insight-driven outputs to support senior leadership decision-making.',
          'Translated complex Nielsen and internal datasets into compelling business narratives, highlighting key performance drivers, risks, and growth opportunities.',
          'Synthesized performance across volume, value, market share, pricing, and distribution, enabling strategic alignment across commercial and financial functions.',
          'Developed consolidated business performance narratives across BAT markets and delivered insight-led presentations to leadership teams, supporting monthly and quarterly business reviews.',
        ],
      },
      {
        name: 'Market & Sales Analytics',
        bullets: [
          'Lead delivery of weekly and monthly Nielsen analytics, including volume, value, and volume/value share tracking for BAT and competitor brands.',
          'Developed and managed Monthly Retail Audit (RA) scorecards, tracking volume & value performance, share progression, pricing (WAP) and price gaps, out-of-stock (OOS) and distribution metrics.',
          'Conducted store-level and regional deep dives, identifying distribution gaps, pricing inconsistencies, and execution opportunities across channels.',
          'Leveraged Nielsen Discover and Kantar Explorer to extract, analyze, and synthesize market data into actionable insights.',
        ],
      },
      {
        name: 'Reporting Transformation & Automation',
        bullets: [
          'Automated reporting processes using Power BI and advanced Excel solutions, reducing reporting turnaround time by over 50% and improving data accuracy.',
          'Designed and maintained regional KPI dashboards, enhancing visibility of performance trends and enabling faster, data-driven decision-making.',
        ],
      },
      {
        name: 'Cross-Functional Business Partnering',
        bullets: [
          'Acted as a trusted insights partner to Commercial, Marketing, Finance, and planning teams, influencing decision-making through data-driven recommendations.',
          'Supported evaluation of campaigns, pricing strategies, and commercial initiatives through analytical deep dives and post-performance reviews.',
          'Collaborated with external partners (Nielsen, Kantar, and Escalent & IPOS) to ensure data and reporting accuracy.',
        ],
      },
      {
        name: 'Data Governance & Quality Management',
        bullets: [
          'Oversee data consolidation, validation, and reconciliation across multiple sources (Nielsen, Kantar, IPSOS, RCS8), ensuring high levels of accuracy and consistency.',
          'Strengthened data governance processes and standards, improving reliability of reporting outputs and confidence in business decisions.',
        ],
      },
    ],
  },
  {
    id: 'demand-planning',
    company: 'British American Tobacco (BAT)',
    title: 'Demand Planning Analyst',
    period: '05/2023 – 02/2025',
    location: 'Nairobi',
    type: 'Past',
    categories: [
      {
        name: 'Business Planning & Performance Reporting',
        bullets: [
          'Lead development of short- and long-term demand forecasts (up to 5 years), providing critical inputs into financial planning, volume projections, and business strategy.',
          'Owned and delivered monthly performance reviews, analyzing forecast vs. actuals, identifying key variances, and translating findings into actionable insights for stakeholders.',
          'Supported Monthly & Weekly Estimate IMS & shipment reporting by aligning demand assumptions, risks, and opportunities across Commercial, Finance, and Supply Chain teams.',
        ],
      },
      {
        name: 'IBP / S&OP Leadership & Cross-Functional Alignment',
        bullets: [
          'Lead demand inputs into the Integrated Business Planning (IBP) / S&OP cycle, ensuring alignment across Commercial, Finance, Supply Chain, and Marketing functions.',
          'Facilitated discussions on demand assumptions, risks, and opportunities, driving consensus and alignment across stakeholders.',
          'Influenced decision-making by presenting data-driven insights and scenario outcomes in key meetings (DPM, CRM, CDRM).',
        ],
      },
      {
        name: 'Advanced Analytics & Scenario Modelling',
        bullets: [
          'Developed and deployed scenario models (seasonality, pricing changes, regulatory shifts, competitor entry, supply disruptions) to assess financial and operational impacts.',
          'Identified key demand drivers and performance risks, providing strategic recommendations to mitigate downside and capture growth opportunities.',
        ],
      },
      {
        name: 'Performance Reporting & Dashboarding',
        bullets: [
          'Designed and maintained automated Power BI dashboards and Excel trackers, enabling real-time tracking of sales, shipments, inventory, and key KPIs.',
          'Delivered regional performance reporting, improving visibility of trends, risks, and forecast accuracy across ESA markets.',
        ],
      },
      {
        name: 'Market, Pricing & Post-Launch Analytics',
        bullets: [
          'Conducted post-launch and pricing performance analysis across ESA markets, evaluating impact on volume, value, and product mix.',
          'Provided insights to optimize pricing strategies, promotional effectiveness, and go-to-market execution.',
        ],
      },
      {
        name: 'Stakeholder Management & Business Partnering',
        bullets: [
          'Closely partnered with Sales, Marketing, Finance, and Supply Chain teams to align forecasts with commercial plans, pricing changes, and market dynamics.',
          'Presented insight-led recommendations to stakeholders, ensuring clear visibility of performance trends, risks, and opportunities.',
        ],
      },
    ],
  },
  {
    id: 'logistics-intern',
    company: 'Tropical Heat Group',
    title: 'Logistics Intern / Data Analyst',
    period: '03/2022 – 04/2023',
    location: 'Nairobi',
    type: 'Past',
    categories: [
      {
        name: 'Key Responsibilities',
        bullets: [
          'Data entry, data management & data analysis.',
          'Preparation and presentation of all logistics weekly and monthly reports.',
          'Ensuring that all occupational Health and Safety (OSH) regulations are followed in the warehouse.',
          'Preparing and updating Standard Operating Procedures (SOPs).',
          'Organizing Logistics Meetings, preparing and sharing minutes.',
          'Training end users on new reports and dashboards.',
          'Recording received delivery documents on the dispatch book as per the policy.',
          'Receiving and processing returns from the market as per the company\'s policy.',
          'Receiving invoices from the Finance department and updating the ERP system.',
          'Dispatching documents to the turnboy as per the company\'s policy.',
          'Ensuring delivery notes are uploaded on the system upon receipt.',
          'Perform orientations and/or schedule training as needed for new employees.',
          'Fleet management and vehicle status reporting.',
        ],
      },
    ],
  },
]

export const contact = {
  heading: "Get In Touch",
  body: "Have a data, analytics, or forecasting challenge? Let's solve it.",
  formTitle: 'Send a Message',
  formSubtitle: "Fill out the form below and I'll get back to you",
  fields: {
    name: { label: 'Name', placeholder: 'Your full name' },
    email: { label: 'Email', placeholder: 'your@email.com' },
    subject: { label: 'Subject', placeholder: "What's this about?" },
    message: { label: 'Message', placeholder: 'Tell me more about your inquiry...' },
  },
  submitButton: 'Send Message',
  successMessage: 'Thank you! Your message has been sent successfully.',
}

export const footer = {
  tagline: 'Insights & Demand Planning Professional · Nairobi, Kenya',
}

export const nav = {
  logo: 'WILFRED KIVINDA',
  links: [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ],
  downloadCV: 'Download CV',
}

export const site = {
  name: "Wilfred Kivinda — Insights & Demand Planning Professional",
  description:
    "Data & Insights professional with expertise in business performance reporting, demand planning, and data-driven storytelling. Based in Nairobi, Kenya.",
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://wilfredkivinda.example',
  ogImage: '/images/og-image.svg',
}
