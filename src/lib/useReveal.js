import { useEffect } from 'react'

/**
 * Reveals sections as they enter view.
 *
 * Three safety rules, because motion must never cost anyone the content:
 *
 *  1. The hidden state is applied by script, so content is visible when
 *     JavaScript does not run.
 *  2. Anything already at or above the fold is revealed immediately, so a
 *     deep link that lands mid-page never shows an invisible section.
 *  3. Reduced-motion preferences skip the effect entirely.
 */
export function useReveal(selector = '.ci-reveal') {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined

    const elements = Array.from(document.querySelectorAll(selector))
    if (!elements.length) return undefined

    const revealNow = (element) => element.classList.add('is-revealed')

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        revealNow(entry.target)
        observer.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 })

    elements.forEach((element) => {
      // Already on screen — including after a hash jump — so do not hide it.
      if (element.getBoundingClientRect().top < window.innerHeight) {
        revealNow(element)
        return
      }
      observer.observe(element)
    })

    /* A late hash jump can move a hidden section into view before the observer
       reports. Re-check once the browser has settled. */
    const settle = window.setTimeout(() => {
      elements.forEach((element) => {
        if (element.classList.contains('is-revealed')) return
        if (element.getBoundingClientRect().top < window.innerHeight) {
          revealNow(element)
          observer.unobserve(element)
        }
      })
    }, 400)

    return () => { window.clearTimeout(settle); observer.disconnect() }
  }, [selector])
}

/**
 * Scrolls to an in-page anchor after the view has rendered.
 *
 * A single-page app does not reliably honour a hash on first paint, because
 * the target does not exist yet when the browser looks for it.
 */
export function useHashScroll() {
  const { hash } = window.location

  useEffect(() => {
    if (!hash) return undefined

    const jump = () => {
      const target = document.querySelector(hash)
      if (!target) return
      const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
    }

    const timer = window.setTimeout(jump, 120)
    return () => window.clearTimeout(timer)
  }, [hash])
}
