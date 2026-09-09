import compactLogo from '../../brand/logos/cognita-lockup-horizontal.svg'
import formalLogo from '../../brand/logos/cognita-lockup-formal.svg'
import whiteMark from '../../brand/logos/cognita-mark-white.svg'

/**
 * The Cognita lockup.
 *
 * Three committed assets, used as supplied — the logo is never redrawn,
 * recoloured, or filtered. On navy the full lockup is unreadable because its
 * wordmark is dark, so `onDark` swaps to the committed white mark and sets the
 * institution name in the display face beside it rather than inverting artwork.
 */
export default function BrandMark({ compact = false, onDark = false }) {
  // The name comes from the image's alt text alone. Repeating it as an
  // aria-label on this wrapper made some screen readers announce the
  // institution twice, and a generic div is not reliably nameable anyway.
  if (onDark) {
    return (
      <div className="brand-lockup brand-lockup--ondark">
        <img className="brand-lockup-mark" src={whiteMark} alt="" />
        <span className="brand-lockup-words">
          <strong>Cognita</strong>
          <span>Institute of Artificial Intelligence</span>
        </span>
      </div>
    )
  }

  return (
    <div className={`brand-lockup ${compact ? 'brand-lockup--compact' : ''}`}>
      <img
        className="brand-logo-image"
        src={compact ? compactLogo : formalLogo}
        alt="The Cognita Institute of Artificial Intelligence"
      />
    </div>
  )
}
