import React, { useCallback, useEffect, useMemo, useState } from 'react'

const TRANSITION_STYLE = { transition: 'all 0.3s' }
const TOTAL_CIRCLES = 12

interface ThemeToggleProps {
  className?: string
}

enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export default function SwitchTheme({ className }: ThemeToggleProps) {
  const [modifiedManually, setModifiedManually] = useState(false)
  const [theme, setTheme] = useState<Theme>(
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ? Theme.Dark : Theme.Light,
  )

  const toggleTheme = useCallback(() => {
    setModifiedManually(true)
    setTheme(prev => prev === Theme.Light ? Theme.Dark : Theme.Light)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (!modifiedManually) {
        setTheme(e.matches ? Theme.Dark : Theme.Light)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [modifiedManually])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.classList.toggle('dark', theme === Theme.Dark)
    document.documentElement.classList.toggle('light', theme === Theme.Light)
  }, [theme])

  const isDark = theme === Theme.Dark

  const outerCircles = useMemo(() =>
    Array.from({ length: TOTAL_CIRCLES }).map((_, i) => {
      const deg = (i * 360) / TOTAL_CIRCLES
      const cx = isDark ? 50 : 50 + 24 * Math.cos((deg * Math.PI) / 180)
      const cy = isDark ? 50 : 50 + 24 * Math.sin((deg * Math.PI) / 180)
      const width = isDark ? 0 : 10
      const height = isDark ? 0 : 6

      return {
        x: cx - width / 2,
        y: cy - height / 2,
        width,
        height,
        rx: height / 2,
        ry: height / 2,
        transform: `rotate(${deg}, ${cx}, ${cy})`,
        style: {
          ...TRANSITION_STYLE,
          transitionDelay: isDark ? '0s' : `${(i * 0.2) / TOTAL_CIRCLES}s`,
          opacity: isDark ? 0 : 1,
        },
      }
    }), [isDark])

  return (
    <button className={className} onClick={toggleTheme} type="button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
        <g>
          {outerCircles.map((attrs, i) => (
            <rect key={i} fill="currentColor" {...attrs} />
          ))}
        </g>
        <defs>
          <mask id="themeToggleMask">
            <circle style={TRANSITION_STYLE} cx="50" cy="50" r={isDark ? 30 : 15} fill="white" />
            <circle
              style={TRANSITION_STYLE}
              cx={isDark ? 65 : 80}
              cy={isDark ? 35 : 20}
              r={isDark ? 25 : 5}
              fill="black"
            />
          </mask>
        </defs>
        <circle cx="50" cy="50" r="30" fill="currentColor" mask="url(#themeToggleMask)" />
      </svg>
    </button>
  )
}
