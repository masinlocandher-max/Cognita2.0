import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useAsync } from '../../hooks/useAsync.js'
import { getOverview } from '../../repositories/adminRepository.js'
import { useDocumentTitle } from '../../hooks/useRobots.js'
import { ADMIN_SECTIONS } from './adminSections.jsx'
import StateBlock, { LoadingRows } from '../../components/StateBlock.jsx'
import Alert from '../../components/Alert.jsx'
import Meter from '../../components/Meter.jsx'

export default function AdminOverview() {
  useDocumentTitle('Admin overview')
  const overview = useAsync(() => getOverview(), [])

  return (
    <div className="stack-7">
      <div className="page-head">
        <p className="eyebrow">Admin</p>
        <h1>Institutional overview</h1>
        <p>Learner volume, admissions flow, and where attention is needed.</p>
      </div>

      <Alert tone="attention" title="Frontend architecture exercise" icon="ShieldAlert">
        This interface proves the shape of the queries an institution needs, over mock records. It is read-only:
        no administrative action here changes anything, because there is nothing behind it to change.
      </Alert>

      {overview.loading ? <LoadingRows rows={2} height={110} />
        : overview.error ? <StateBlock variant="error" />
        : (
          <>
            <div className="grid-auto">
              {overview.data.metrics.map((metric) => (
                <article className="card metric-card" key={metric.id}>
                  <p className="card-title">{metric.label}</p>
                  <p className="metric-value tabular">{metric.value}</p>
                  <p className="card-note">{metric.note}</p>
                </article>
              ))}
            </div>

            <section className="card">
              <p className="card-title">Learners by journey stage</p>
              <div className="stack-4" style={{ marginTop: 'var(--s-4)' }}>
                {overview.data.journeyBreakdown.map((entry) => (
                  <Meter
                    key={entry.stage}
                    value={entry.count}
                    max={Math.max(...overview.data.journeyBreakdown.map((item) => item.count))}
                    label={entry.stage.replace(/_/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase())}
                    valueText={String(entry.count)}
                  />
                ))}
              </div>
            </section>
          </>
        )}

      <section className="stack-4">
        <h2 style={{ fontSize: 'var(--display-sm)' }}>Sections</h2>
        <div className="grid-auto">
          {ADMIN_SECTIONS.map((section) => (
            <Link className="card admin-section-card" key={section.id} to={section.to}>
              <p className="card-title">{section.label}</p>
              <p className="card-note">{section.description}</p>
              <span className="link-arrow">Open <ArrowRight size={14} /></span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
