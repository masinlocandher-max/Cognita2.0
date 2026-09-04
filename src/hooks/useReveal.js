import { useEffect } from 'react'

/**
 * Reveals sections as they enter the viewport.
 *
 * The hidden state is applied by this hook rather than by the stylesheet, so
 * content is visible when JavaScript does not run. Reduced-motion preferences
 * are honoured in CSS, and every layout is designed to read correctly with the
 * motion removed entirely.
 */
export function useReveal(selector = '[data-reveal]') {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(selector))
    if (!elements.length || typeof IntersectionObserver === 'undefined') return undefined

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return undefined

    elements.forEach((element) => element.classList.add('reveal--armed'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-revealed')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [selector])
}
