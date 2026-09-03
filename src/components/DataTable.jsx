import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, Search } from 'lucide-react'
import { queryCollection } from '../repositories/adminRepository.js'
import StateBlock, { LoadingRows } from './StateBlock.jsx'

/**
 * One table for every administrative surface.
 *
 * Search, filter, sort and pagination run against the same query shape a
 * paginated server endpoint will accept, so moving the data to a backend does
 * not change the component.
 */
export default function DataTable({
  columns,
  rows,
  loading = false,
  error = null,
  searchFields = [],
  searchPlaceholder = 'Search',
  filters = [],
  pageSize = 10,
  emptyTitle = 'No records',
  emptyDescription,
  caption,
}) {
  const [search, setSearch] = useState('')
  const [filterValues, setFilterValues] = useState({})
  const [sort, setSort] = useState(null)
  const [page, setPage] = useState(1)

  const result = useMemo(
    () => queryCollection(rows || [], { search, searchFields, filters: filterValues, sort, page, pageSize }),
    [rows, search, searchFields, filterValues, sort, page, pageSize],
  )

  const toggleSort = (field) => {
    setPage(1)
    setSort((current) => {
      if (current?.field !== field) return { field, direction: 'asc' }
      if (current.direction === 'asc') return { field, direction: 'desc' }
      return null
    })
  }

  const hasControls = searchFields.length > 0 || filters.length > 0

  return (
    <div className="panel">
      {hasControls ? (
        <div className="panel-head">
          {searchFields.length ? (
            <div className="search" style={{ flex: '1 1 220px', maxWidth: 340 }}>
              <Search size={15} aria-hidden="true" />
              <input
                className="input"
                type="search"
                value={search}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                onChange={(event) => { setSearch(event.target.value); setPage(1) }}
              />
            </div>
          ) : <span />}

          {filters.length ? (
            <div className="wrap-actions">
              {filters.map((filter) => (
                <label key={filter.id} className="row" style={{ gap: 8 }}>
                  <span className="visually-hidden">{filter.label}</span>
                  <select
                    className="select"
                    style={{ minWidth: 170 }}
                    value={filterValues[filter.id] || 'all'}
                    onChange={(event) => { setFilterValues((current) => ({ ...current, [filter.id]: event.target.value })); setPage(1) }}
                  >
                    <option value="all">{filter.label}: all</option>
                    {filter.options.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {loading ? (
        <div className="panel-body"><LoadingRows rows={4} /></div>
      ) : error ? (
        <StateBlock variant="error" description="This view could not load its records. Reload the page to try again." />
      ) : !result.rows.length ? (
        <StateBlock variant="empty" title={emptyTitle} description={emptyDescription} />
      ) : (
        <>
          <div className="table-wrap">
            <table className="table">
              {caption ? <caption className="visually-hidden">{caption}</caption> : null}
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.id} scope="col" aria-sort={sort?.field === column.id ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}>
                      {column.sortable === false ? column.label : (
                        <button type="button" onClick={() => toggleSort(column.id)}>
                          {column.label}
                          {sort?.field === column.id ? (sort.direction === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />) : null}
                        </button>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row) => (
                  <tr key={row.id}>
                    {columns.map((column) => (
                      <td key={column.id} className={column.numeric ? 'cell-num' : undefined}>
                        {column.render ? column.render(row) : String(row[column.id] ?? '—')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-foot">
            <span>
              Showing {result.rows.length} of {result.total} {result.total === 1 ? 'record' : 'records'}
            </span>
            {result.pageCount > 1 ? (
              <div className="row" style={{ gap: 6 }}>
                <button type="button" className="btn btn--secondary btn--sm" onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={result.page === 1}>
                  <ChevronLeft size={14} /> Previous
                </button>
                <span className="tabular">Page {result.page} of {result.pageCount}</span>
                <button type="button" className="btn btn--secondary btn--sm" onClick={() => setPage((value) => Math.min(result.pageCount, value + 1))} disabled={result.page === result.pageCount}>
                  Next <ChevronRight size={14} />
                </button>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  )
}
