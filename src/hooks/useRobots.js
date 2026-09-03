import { useEffect } from 'react'

/**
 * Marks internal surfaces noindex, nofollow.
 *
 * The evaluator workspace and the admin interface are not public pages, and
 * nothing links to them from public navigation.
 */
export function useRobots(content = 'noindex, nofollow') {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = content
    document.head.appendChild(meta)
    return () => { document.head.removeChild(meta) }
  }, [content])
}

/** Sets the document title for a route. */
export function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title
    document.title = title ? `${title} · Cognita` : 'Cognita Institute of Artificial Intelligence'
    return () => { document.title = previous }
  }, [title])
}
