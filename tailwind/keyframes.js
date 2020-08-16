module.exports = {
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
  'fade-in': {
    '0%': {
      opacity: 0,
    },
    '100%': { opacity: 1 },
  },
  'fade-in-left': {
    '0%': {
      transform: 'translateX(-50px)',
      opacity: 0,
    },
    '100%': { transform: 'translateX(0px)', opacity: 1 },
  },
  'fade-in-right': {
    '0%': {
      transform: 'translateX(50px)',
      opacity: 0,
    },
    '100%': { transform: 'translateX(0px)', opacity: 1 },
  },
  'fade-out-left': {
    '0%': {
      transform: 'translateX(0px)',
      opacity: 1,
    },
    '100%': { transform: 'translateX(-50px)', opacity: 0 },
  },
  'fade-out-right': {
    '0%': {
      transform: 'translateX(0px)',
      opacity: 1,
    },
    '100%': { transform: 'translateX(50px)', opacity: 0 },
  },
}
