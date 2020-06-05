export default {
  dva: {},
  antd: {},
  alias: {
    '@': require('path').resolve(__dirname, './src'),
    '@components': require('path').resolve(__dirname, './src/components'),
  },
  proxy: {
    '/api': {
      target: 'http://cms-api.drugeyes.vip:7031',
      changeOrigin: true,
      pathRewrite: { '/api': '' },
    },
  },
}
