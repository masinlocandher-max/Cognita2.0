import compactLogo from '../../brand/logos/cognita-lockup-horizontal.svg'
import formalLogo from '../../brand/logos/cognita-lockup-formal.svg'

export default function BrandMark({ compact = false }) {
  return (
    <div
      className={`brand-lockup ${compact ? 'brand-lockup--compact' : ''}`}
      aria-label="The Cognita Institute of Artificial Intelligence"
    >
      <img
        className="brand-logo-image"
        src={compact ? compactLogo : formalLogo}
        alt="The Cognita Institute of Artificial Intelligence"
      />
    </div>
  )
}
