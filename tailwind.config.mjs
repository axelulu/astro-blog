/** @type {import('tailwindcss').Config} */
import svgToDataUri from 'mini-svg-data-uri'
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette'

function generateSlideEnterStages({ addUtilities }) {
  const newUtilities = {}

  for (let i = 1; i <= 20; i++) {
    newUtilities[`.slide-enter-content > :nth-child(${i})`] = {
      '--enter-stage': `${i} !important`,
    }
  }

  addUtilities(newUtilities, ['responsive'])
}
function addStrokeTextUtilities({ addUtilities, matchUtilities, theme, e }) {
  // 固定颜色的实现
  const colors = theme('colors')
  const strokeUtilities = Object.keys(colors).reduce((acc, colorName) => {
    const colorValue = colors[colorName]
    if (typeof colorValue === 'object') {
      Object.keys(colorValue).forEach((shade) => {
        acc[`.stroke-text-${e(colorName)}-${e(shade)}`] = {
          'color': 'transparent',
          '-webkit-text-stroke': `2px ${colorValue[shade]}`,
        }
      })
    }
    else {
      acc[`.stroke-text-${e(colorName)}`] = {
        'color': 'transparent',
        '-webkit-text-stroke': `2px ${colorValue}`,
      }
    }
    return acc
  }, {})

  addUtilities(strokeUtilities, ['responsive', 'hover'])

  // 动态颜色的实现
  matchUtilities({
    'stroke-text': value => ({
      'color': 'transparent',
      '-webkit-text-stroke': `2px ${value}`,
    }),
  }, { values: theme('colors') })
}
/**
 * Generate background patterns
 * @param {*} param
 * @param {*} param.matchUtilities - Tailwind's matchUtilities function
 * @param {*} param.theme - Tailwind's theme function
 */
function generateBackgroundPatterns({ matchUtilities, theme }) {
  matchUtilities(
    {
      'bg-grid': value => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
        )}")`,
      }),
      'bg-grid-small': value => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`,
        )}")`,
      }),
      'bg-dot': value => ({
        backgroundImage: `url("${svgToDataUri(
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`,
        )}")`,
      }),
    },
    { values: flattenColorPalette(theme('backgroundColor')), type: 'color' },
  )
}
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Huiwen-mincho', 'Merriweather', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        filter: {
          'blur-20': 'blur(20px)',
          'blur-25': 'blur(25px)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'breathe-light': {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 0px rgba(0, 0, 0, 0))',
          },
          '50%': {
            filter: 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.8))',
          },
        },
        'breathe-dark': {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 0px rgba(255, 255, 255, 0))',
          },
          '50%': {
            filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.8))',
          },
        },
        'reveal-up': {
          '0%': { opacity: '0', transform: 'translateY(80%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'reveal-down': {
          '0%': { opacity: '0', transform: 'translateY(-80%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'content-blur': {
          '0%': { filter: 'blur(0.3rem)' },
          '100%': { filter: 'blur(0)' },
        },
        'pop-blob': {
          '0%': { transform: 'scale(1)' },
          '33%': { transform: 'scale(1.2)' },
          '66%': { transform: 'scale(0.8)' },
          '100%': { transform: 'scale(1)' },
        },
        'drawSignature': {
          '0%': { strokeDashoffset: '2400' },
          '15%': { fill: 'transparent' },
          '35%, 75%': { strokeDashoffset: '0', fill: 'currentColor' },
          '90%, 100%': { strokeDashoffset: '2400', fill: 'currentColor' },
        },
        'wave': {
          '0%': { transform: 'rotate(0deg)' },
          '10%': { transform: 'rotate(14deg)' },
          '20%': { transform: 'rotate(-8deg)' },
          '30%': { transform: 'rotate(14deg)' },
          '40%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(10deg)' },
          '60%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },

      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'breathe-light': 'breathe-light 2s infinite',
        'breathe-dark': 'breathe-dark 2s infinite',
        'pop-blob': 'pop-blob 4s infinite',
        'draw-signature': 'drawSignature 8s linear infinite',
        'wave': 'wave 4s ease-in-out 2s infinite alternate',
      },
      transformOrigin: {
        wave: '70% 70%',
      },
      transitionTimingFunction: {
        'minor-spring': 'cubic-bezier(0.18,0.89,0.82,1.04)',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    generateBackgroundPatterns,
    generateSlideEnterStages,
    addStrokeTextUtilities,
  ],
}
