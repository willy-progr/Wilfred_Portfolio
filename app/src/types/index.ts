/**
 * TypeScript type definitions for the portfolio site
 */

export interface PersonalInfo {
  name: string
  title: string
  location: string
  email: string
  phone: string
  phoneRaw: string
  linkedIn: string
  whatsapp: string
  cvPath: string
  /** Suggested download filename in the user’s Downloads folder */
  cvFileName: string
}

export interface ExperienceRole {
  id: string
  company: string
  title: string
  period: string
  location: string
  type: 'Current' | 'Past'
  categories: {
    name: string
    bullets: string[]
  }[]
}

export interface EducationEntry {
  institution: string
  degree: string
  location: string
  date: string
}

export interface Referee {
  name: string
  role: string
  company: string
  email: string
  phone: string
}

export interface ImpactItem {
  stat: string
  title: string
  body: string
}

export interface SkillGroup {
  group: string
  items: string[]
}

export interface NavLink {
  label: string
  href: string
}
