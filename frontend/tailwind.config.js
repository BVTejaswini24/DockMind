/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'obsidian-canvas': '#101010',
        'carbon-lift': '#1d1a18',
        'ash-stroke': '#3d3a39',
        'graphite-mid': '#4d4947',
        'warm-granite': '#8a8380',
        'pale-stone': '#b8b3b0',
        'bone': '#eeeeee',
        'chalk': '#fafafa',
        'metric-green': '#a0ca92',
        accent: {
          DEFAULT: '#B4F461',
          muted: '#9AD452',
        },
        text: {
          primary: '#eeeeee',
          secondary: '#8a8380',
          tertiary: '#4d4947',
          inverse: '#101010',
        },
        surface: {
          base: '#101010',
          raised: '#1d1a18',
          muted: '#2a2624',
        },
        border: {
          DEFAULT: '#3d3a39',
          focus: '#B4F461',
        },
        status: {
          error: '#e5484d',
          success: '#a0ca92',
        },
      },
      fontFamily: {
        sans: ['Instrument Sans', 'Geist', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
      },
      fontSize: {
        'caption': ['12px', { lineHeight: '1', letterSpacing: '-0.24px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.43', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'heading': ['36px', { lineHeight: '1.1', letterSpacing: '-1.12px', fontWeight: '400' }],
        'heading-lg': ['44px', { lineHeight: '1.12', letterSpacing: '-1.1px', fontWeight: '400' }],
        'display': ['72px', { lineHeight: '1', letterSpacing: '-2.88px', fontWeight: '400' }],
      },
      borderRadius: {
        'nav': '3px',
        'cards': '10px',
        'buttons': '3px',
        'largepanels': '20px',
      },
      transitionDuration: {
        'instant': '100ms',
        'fast': '150ms',
        'normal': '200ms',
        'slow': '250ms',
      },
      transitionTimingFunction: {
        'factory': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'focus-accent': '0px 0px 0px 2px #101010, 0px 0px 0px 4px var(--color-accent)',
      },
    },
  },
  plugins: [],
}
