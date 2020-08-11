const plugin = require('tailwindcss/plugin')
const utilities = require('./tailwind/utilities')
const animation = require('./tailwind/animation')
const keyframes = require('./tailwind/keyframes')

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
      addUtilities({ ...utilities })
    }),
  ],
  theme: {
    extend: {
      animation,
      keyframes,
    },
  },
}
