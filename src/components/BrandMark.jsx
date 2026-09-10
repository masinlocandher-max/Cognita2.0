import wordmark from '../../brand/logos/cognita-wordmark.webp'

export default function BrandMark({ compact = false }) {
  return (
    <div
      className={`brand-lockup ${compact ? 'brand-lockup--compact' : ''}`}
      aria-label="The Cognita Institute of Artificial Intelligence"
    >
      <img
        className="brand-logo-image"
        src={wordmark}
        alt="Cognita"
      />
    </div>
  )
}
