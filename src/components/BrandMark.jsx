/*
 * The Cognita wordmark.
 *
 * INTERIM — the approved asset is currently unusable.
 * brand/logos/cognita-wordmark.webp (committed on main in de97e78, md5
 * 2e097faa…) is malformed: its RIFF header declares 7638 bytes while the file
 * is 7711, and it decodes to noise rather than the wordmark. Rendering it put
 * a grey smear where the institution's name should be, on every page.
 *
 * So the name is set in the approved display face instead. That is typesetting,
 * not artwork: brand/README.md forbids redrawing the logo, and nothing here
 * attempts the stylised A — this is a stand-in until a valid file lands.
 *
 * TO RESTORE: drop a working file at brand/logos/cognita-wordmark.webp and
 * swap the <span> below back to:
 *   import wordmark from '../../brand/logos/cognita-wordmark.webp'
 *   <img className="brand-logo-image" src={wordmark} alt="Cognita" />
 */
export default function BrandMark({ compact = false }) {
  return (
    <div className={`brand-lockup ${compact ? 'brand-lockup--compact' : ''}`}>
      <span className="brand-wordmark-text">
        <strong>COGNITA</strong>
        <span>Institute of Artificial Intelligence</span>
      </span>
    </div>
  )
}
