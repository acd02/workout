const computePath = require('./utils').computePath

module.exports = {
  webpack(config, options) {
    const esLintRule = {
      test: /\.tsx$/,
      enforce: 'pre',
      exclude: ['/node_modules/', '/.next/'],
      loader: 'eslint-loader'
    }
    config.module.rules.push(esLintRule)

    config.resolve.alias = {
      ...config.resolve.alias,
      components: computePath('./src/components/'),
      hooks: computePath('./src/hooks/'),
      machines: computePath('./src/machines/'),
      pages: computePath('./src/pages/'),
      pagesContent: computePath('./src/pagesContent/'),
      public: computePath('./public/'),
      theme: computePath('./src/theme.ts'),
      utils: computePath('./src/utils')
    }

    return config
  }
}
