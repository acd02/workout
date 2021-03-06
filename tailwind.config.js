const plugin = require('tailwindcss/plugin')
const utilities = require('./tailwind/utilities')
const animation = require('./tailwind/animation')
const colors = require('./tailwind/colors')
const keyframes = require('./tailwind/keyframes')

module.exports = {
  purge: {
    content: [
      './src/components/**/*.tsx',
      './src/pages/**/*.tsx',
      './src/pagesContent/**/*.tsx',
    ],
  },
  plugins: [
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
    colors,
    extend: {
      animation,
      keyframes,
    },
  },
}
