const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: [
    './src/components/**/*.tsx',
    './src/pages/**/*.tsx',
    './src/pagesContent/**/*.tsx',
  ],
  theme: {
    extend: {},
  },
  variants: {
    display: ['responsive', 'important'],
    textColor: ['responsive', 'hover', 'focus', 'important', 'important-hover'],
  },
  plugins: [
    require('@tailwindcss/ui'),
    require('tailwindcss-typography'),
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
  ],
}
