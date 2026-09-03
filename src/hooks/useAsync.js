import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Runs an async repository call and exposes explicit loading / error / empty
 * states. Repositories are async today so that the switch to a network backend
 * does not introduce states the interface has never rendered.
 */
export function useAsync(loader, deps = [], { immediate = true } = {}) {
  const [state, setState] = useState({ data: null, loading: immediate, error: null })
  const mounted = useRef(true)
  const loaderRef = useRef(loader)
  loaderRef.current = loader

  useEffect(() => {
    mounted.current = true
    return () => { mounted.current = false }
  }, [])

  const run = useCallback(async () => {
    setState((current) => ({ ...current, loading: true, error: null }))
    try {
      const data = await loaderRef.current()
      if (mounted.current) setState({ data, loading: false, error: null })
      return data
    } catch (error) {
      if (mounted.current) setState({ data: null, loading: false, error })
      return null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (immediate) run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { ...state, reload: run }
}
