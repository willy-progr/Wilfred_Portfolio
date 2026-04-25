/**
 * Fetches the CV from the same origin and triggers a file download with a stable filename.
 * Improves behaviour vs a raw <a download> in some browsers (notably older Safari / iOS).
 */
export async function downloadCvAsFile(path: string, filename: string): Promise<void> {
  const res = await fetch(path, { method: 'GET', credentials: 'same-origin' })
  if (!res.ok) {
    throw new Error(`CV not found (${res.status})`)
  }
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.rel = 'noopener noreferrer'
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
