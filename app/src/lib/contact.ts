/**
 * Contact form — posts to Web3Forms (https://web3forms.com).
 * Works with static export and `next dev` (unlike a same-origin /api route on static-only hosts).
 *
 * 1) Create a free form at web3forms.com, set the inbox to your email (e.g. kivindawilfred@outlook.com).
 * 2) Set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local and in Cloudflare Pages (build) env.
 */

const WEB3_FORMS_URL = 'https://api.web3forms.com/submit'

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  /** Honeypot — should be empty */
  website?: string
}

export interface ContactResponse {
  success: boolean
  message: string
}

export async function submitContactForm(data: ContactFormData): Promise<ContactResponse> {
  if (data.website && data.website.length > 0) {
    return { success: true, message: 'Message received' }
  }

  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
  if (!accessKey) {
    throw new Error(
      'The contact form is not configured. Add NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY to your environment, or use Email Me to reach out directly.'
    )
  }

  const res = await fetch(WEB3_FORMS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `[Portfolio] ${data.subject.trim()}`,
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
      botcheck: data.website ?? '',
    }),
  })

  let json: { success?: boolean; message?: string } = {}
  try {
    json = (await res.json()) as { success?: boolean; message?: string }
  } catch {
    throw new Error('Could not read the form response. Please try again or use the email link.')
  }

  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Could not send your message. Please try again or use the email link.')
  }

  return { success: true, message: json.message || 'Message sent successfully' }
}
