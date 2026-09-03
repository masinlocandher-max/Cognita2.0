import * as icons from 'lucide-react'

/**
 * The four states every data surface can be in, rendered consistently.
 *
 * `restricted` and `not-connected` are honest states in this build: they say a
 * capability does not exist yet rather than showing an empty table that reads
 * as "no records".
 */
const PRESETS = {
  empty: { icon: 'Inbox', title: 'Nothing here yet' },
  loading: { icon: 'Loader', title: 'Loading' },
  error: { icon: 'TriangleAlert', title: 'Something went wrong' },
  restricted: { icon: 'Lock', title: 'Restricted' },
  'not-connected': { icon: 'PlugZap', title: 'Not connected in this build' },
}

export default function StateBlock({ variant = 'empty', title, description, action, icon }) {
  const preset = PRESETS[variant] || PRESETS.empty
  const Icon = icons[icon || preset.icon] || icons.Inbox

  return (
    <div className="state-block" role={variant === 'error' ? 'alert' : undefined}>
      <span className="state-icon"><Icon aria-hidden="true" size={20} /></span>
      <h4>{title || preset.title}</h4>
      {description ? <p>{description}</p> : null}
      {action || null}
    </div>
  )
}

export function LoadingRows({ rows = 3, height = 56 }) {
  return (
    <div className="stack-2" aria-busy="true" aria-live="polite">
      <span className="visually-hidden">Loading</span>
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="skeleton" style={{ height }} />
      ))}
    </div>
  )
}
