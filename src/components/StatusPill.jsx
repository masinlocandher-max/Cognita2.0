import * as icons from 'lucide-react'
import { statusMeta } from '../lib/status.js'

/**
 * Status is never colour alone: every pill carries an icon and a text label,
 * so it survives greyscale, colour-blindness and a screenshot in a document.
 */
export default function StatusPill({ status, label, tone, icon, size = 'md' }) {
  const meta = status ? statusMeta(status, label) : { label, tone: tone || 'quiet', icon: icon || 'Circle' }
  const resolvedTone = tone || meta.tone
  const Icon = icons[icon || meta.icon] || icons.Circle

  return (
    <span className={`status status--${resolvedTone}${size === 'sm' ? ' status--sm' : ''}`}>
      <Icon aria-hidden="true" />
      {label || meta.label}
    </span>
  )
}
