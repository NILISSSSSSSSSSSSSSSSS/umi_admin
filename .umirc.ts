export default {
  dva: { immer: true, hmr: true },
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

  routes: [
    // 登录
    { path: '/login', breadcrumb: '登录', component: '@/pages/login/index2', exact: true },
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        { path: '/classify', component: '@/pages/lifeSciences/classify/index' },
        // { path: '/admin', component: 'admin' },
      ],
    },
  ]
}
