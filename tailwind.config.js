const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: {
    mode: 'all',
    content: [
      './src/components/**/*.tsx',
      './src/pages/**/*.tsx',
      './src/pagesContent/**/*.tsx',
    ],
  },
  plugins: [
    require('@tailwindcss/ui'),
    plugin(function ({ addVariant }) {
      addVariant('important', ({ container }) => {
        container.walkRules(rule => {
          rule.selector = `.\\!${rule.selector.slice(1)}`
          rule.walkDecls(decl => {
            decl.important = true
          })
        })
      })
    }),
    plugin(function ({ addVariant }) {
      addVariant('important-hover', ({ container }) => {
        container.walkRules(rule => {
          rule.selector = `.\\!hover-${rule.selector.slice(1)}:hover`
          rule.walkDecls(decl => {
            decl.important = true
          })
        })
      })
    }),
    plugin(function ({ addUtilities }) {
      const tabularNums = {
        '.tabular-nums': {
          'font-variant-numeric': 'tabular-nums',
        },
      }

      const flipX = {
        '.flip-x': {
          transform: 'scaleX(-1)',
        },
      }

      addUtilities({ ...tabularNums, ...flipX })
    }),
  ],
  theme: {
    extend: {
      animation: {
        heartbeat: 'heartbeat 5s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite both',
        'heartbeat-double-time':
          'heartbeat 1s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite both',
      },
      keyframes: {
        heartbeat: {
          '0%': {
            transform: 'scale(1)',
            'transform-origin': 'center center',
            'animation-timing-function': 'ease-out',
          },
          '10%': { transform: 'scale(0.96)', 'animation-timing-function': 'ease-in' },
          '17%': { transform: 'scale(0.98)', 'animation-timing-function': 'ease-out' },
          '33%': { transform: 'scale(0.92)', 'animation-timing-function': 'ease-in' },
          '45%': { transform: 'scale(1)', 'animation-timing-function': 'ease-out' },
        },
      },
    },
  },
}
