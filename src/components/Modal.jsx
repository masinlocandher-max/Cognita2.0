import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

/** Focus-trapped dialog. Escape closes; focus returns to the opener. */
export default function Modal({ open, onClose, title, description, children, actions }) {
  const dialogRef = useRef(null)
  const openerRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    openerRef.current = document.activeElement

    const onKeyDown = (event) => {
      if (event.key === 'Escape') { onClose?.(); return }
      if (event.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }

    document.addEventListener('keydown', onKeyDown)
    const timer = window.setTimeout(() => {
      dialogRef.current?.querySelector('button, a[href], input, textarea')?.focus()
    }, 20)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      window.clearTimeout(timer)
      if (openerRef.current instanceof HTMLElement) openerRef.current.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose?.() }}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" ref={dialogRef}>
        <div className="modal-head">
          <div>
            <h3 id="modal-title">{title}</h3>
            {description ? <p className="muted" style={{ marginTop: 6, fontSize: 'var(--text-sm)' }}>{description}</p> : null}
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close dialog"><X size={18} /></button>
        </div>
        {children}
        {actions ? <div className="modal-actions">{actions}</div> : null}
      </div>
    </div>
  )
}
