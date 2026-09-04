import { useSearchParams } from 'react-router-dom'
import { useAsync } from '../../hooks/useAsync.js'
import { findAdminSection } from './adminSections.jsx'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import DataTable from '../../components/DataTable.jsx'
import StateBlock from '../../components/StateBlock.jsx'
import Alert from '../../components/Alert.jsx'

/**
 * Renders any admin section from its configuration.
 *
 * `?state=` renders a state for design review — empty, error, restricted or
 * loading. It is a labeled preview of a real state, not a simulated failure,
 * and it never appears unless the parameter is present in the URL.
 */
export default function AdminSection({ sectionId }) {
  const section = findAdminSection(sectionId)
  const [params] = useSearchParams()
  const preview = params.get('state')
  useDocumentTitle(section?.title)

  const data = useAsync(() => (section?.load ? section.load() : Promise.resolve([])), [sectionId])

  if (!section) return <StateBlock variant="empty" title="Section not found" />

  const rows = preview === 'empty' ? [] : data.data || []

  return (
    <div className="stack-6">
      <div className="page-head">
        <p className="eyebrow">Admin</p>
        <h1>{section.title}</h1>
        <p>{section.description}</p>
      </div>

      {preview ? (
        <Alert tone="info" title={`State preview: ${preview}`} icon="Eye">
          This is a deliberate preview of the “{preview}” state for design review, triggered by the URL. Remove
          <code> ?state={preview} </code> to see the real data.
        </Alert>
      ) : null}

      {section.notConnected ? (
        <StateBlock variant="not-connected" title="Not connected in this build" description={section.notConnected} />
      ) : preview === 'restricted' ? (
        <StateBlock variant="restricted" title="You do not have access to this section" description="Role-based access will be enforced by the backend. Nothing is enforced in this build." />
      ) : (
        <DataTable
          columns={section.columns}
          rows={rows}
          loading={preview === 'loading' || data.loading}
          error={preview === 'error' ? new Error('preview') : data.error}
          searchFields={section.searchFields || []}
          searchPlaceholder={section.searchPlaceholder || `Search ${section.label.toLowerCase()}`}
          filters={section.filters || []}
          emptyTitle={`No ${section.label.toLowerCase()} match`}
          emptyDescription="Adjust the search or filter."
          caption={section.title}
        />
      )}

      <p className="muted" style={{ fontSize: 'var(--text-xs)' }}>
        Read-only. This build performs no administrative mutations — a button that does not persist anywhere would be
        a false confirmation.
      </p>
    </div>
  )
}
