const animation = require('./tailwind/animation')
const colors = require('./tailwind/colors')
const keyframes = require('./tailwind/keyframes')

module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './src/components/**/*.tsx',
      './src/pages/**/*.tsx',
      './src/pagesContent/**/*.tsx',
    ],
  },
  theme: {
    colors,
    extend: {
      animation,
      keyframes,
    },
  },
}
