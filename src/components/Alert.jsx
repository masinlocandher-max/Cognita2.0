import * as icons from 'lucide-react'

const TONE_ICON = {
  info: 'Info',
  attention: 'TriangleAlert',
  critical: 'OctagonAlert',
  positive: 'CircleCheck',
  neutral: 'Info',
}

export default function Alert({ tone = 'neutral', title, children, icon, role }) {
  const Icon = icons[icon || TONE_ICON[tone] || 'Info'] || icons.Info

  return (
    <div className={`alert${tone !== 'neutral' ? ` alert--${tone}` : ''}`} role={role || (tone === 'critical' ? 'alert' : undefined)}>
      <Icon size={17} aria-hidden="true" />
      <div>
        {title ? <strong>{title}</strong> : null}
        {children}
      </div>
    </div>
  )
}

/**
 * The standing truth of this build, used wherever a learner might otherwise
 * assume their work has reached Cognita.
 */
export function LocalOnlyNotice({ children }) {
  return (
    <Alert tone="attention" title="Stored on this device" icon="Laptop">
      {children || 'This is a frontend preview. Your records are saved in this browser only — they are not transmitted to Cognita, not reviewed by staff, and not synced between devices.'}
    </Alert>
  )
}
