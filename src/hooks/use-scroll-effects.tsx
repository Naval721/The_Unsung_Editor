import { useEffect, useRef, useState } from 'react'

export function useScrollReveal(
  threshold = 0.1,
  once = true,
  rootMargin: string = '0px 0px -10% 0px'
) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Respect user motion preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      setIsVisible(true)
      return
    }

    const thresholds = Array.isArray(threshold)
      ? (threshold as unknown as number[])
      : Array.from({ length: 6 }, (_, i) => Math.min(1, i * Math.max(0.01, threshold)))

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(entry.target)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold: thresholds,
        rootMargin
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, once, rootMargin])

  return [ref, isVisible] as const
}

export function useParallax(speed = 0.5) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + scrolled
          const elementHeight = element.offsetHeight
          const windowHeight = window.innerHeight

          if (scrolled + windowHeight > elementTop - 100 && scrolled < elementTop + elementHeight + 100) {
            const yPos = -(scrolled - elementTop) * speed
            element.style.transform = `translate3d(0, ${yPos}px, 0)`
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return ref
}

export function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      const moveX = x * strength
      const moveY = y * strength

      element.style.transform = `translate(${moveX}px, ${moveY}px)`
    }

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0px, 0px)'
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  return ref
}

export function useScrollScale(minScale = 0.95, maxScale = 1) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(minScale)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          const newScale = minScale + ((maxScale - minScale) * entry.intersectionRatio)
          setScale(newScale)
          element.style.transform = `scale(${newScale})`
        } else {
          setIsVisible(false)
        }
      },
      { 
        threshold: Array.from({ length: 101 }, (_, i) => i / 100)
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [minScale, maxScale])

  return [ref, isVisible] as const
}

export function useTextReveal() {
  const ref = useRef<HTMLElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return [ref, isRevealed] as const
}

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let ticking = false

    const updateScrollProgress = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.pageYOffset
          const docHeight = document.documentElement.scrollHeight - window.innerHeight
          const progress = scrollTop / docHeight
          setScrollProgress(Math.min(Math.max(progress, 0), 1))
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    updateScrollProgress()

    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return scrollProgress
}

export function useIntersectionRatio(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null)
  const [ratio, setRatio] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setRatio(entry.intersectionRatio)
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100)
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return [ref, ratio, isVisible] as const
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      if (width < 768) {
        setBreakpoint('mobile')
      } else if (width < 1024) {
        setBreakpoint('tablet')
      } else {
        setBreakpoint('desktop')
      }
    }

    updateBreakpoint()
    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return breakpoint
}