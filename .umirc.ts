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

  routes: [
    // 登录
    { path: '/login', breadcrumb: '登录', component: '@/pages/login/index2', exact: true },
    // {
    //   path: '/', breadcrumb: null, component: '@/layouts/index',
    //   routes: [
    //     /**
    //      * 
    //      * 数据管理
    //      */

    //     // 分类管理
    //     {
    //       path: 'category', breadcrumb: '分类管理', component: '@/pages/category/index',
    //       routes: [
    //         { path: 'database', breadcrumb: '数据库分类', component: '@/pages/category/databaseCategory/index' },
    //       ]
    //     },
    //     // 数据库管理
    //     {
    //       path: 'database', breadcrumb: '数据管理', component: '@/pages/database/index',
    //       routes: [
    //         { path: 'database', breadcrumb: '数据库管理', component: '@/pages/database/databaseManage/index' },
    //         { path: 'attribute', breadcrumb: '属性模板', component: '@/pages/database/attribute/index' }
    //       ]
    //     },
    //     // 源数据库设置
    //     {
    //       path: 'original', breadcrumb: '源数据库设置', component: '@/pages/original/index',
    //       routes: [
    //         { path: 'field', breadcrumb: '字段名称管理', component: '@/pages/original/field/index' },
    //       ]
    //     },
    //     // 词典管理
    //     {
    //       path: 'dictionary', breadcrumb: '词典管理', component: '@/pages/dictionary/index',
    //       routes: [
    //         { path: 'word', breadcrumb: '词库管理', component: '@/pages/dictionary/wordLibrary/index' },
    //         { path: 'unMatch', breadcrumb: '未匹配词库', component: '@/pages/dictionary/unMatch/index' }
    //       ]
    //     },
    //     /**
    //      * 平台管理
    //      * 
    //      */

    //     // 用户管理
    //     {
    //       path: 'user', breadcrumb: '用户管理', component: '@/pages/user/index',
    //       routes: [
    //         { path: 'list', breadcrumb: '用户列表', component: '@/pages/user/userList/index' },
    //         { path: 'application', breadcrumb: '试用申请', component: '@/pages/user/application/index' }
    //       ]
    //     },
    //     // 数据推荐
    //     {
    //       path: 'recommend', breadcrumb: '数据推荐', component: '@/pages/recommend/index',
    //       routes: [
    //         { path: 'database', breadcrumb: '首页数据库推荐', component: '@/pages/recommend/homeDatabase/index' },
    //         { path: 'introduction', breadcrumb: '数据库简介', component: '@/pages/recommend/introduction/index' }
    //       ]
    //     }
    //   ]
    // }
  ]
}
