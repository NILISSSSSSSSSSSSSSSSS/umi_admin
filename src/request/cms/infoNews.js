import {
  GET,
  POST,
  PATCH,
  DELETE,
  POSTFILE
} from '../http'

const infoNews = {
  /* ================== banner管理 ================== */
  infoBanner: (data) => GET('/v1/forward/cms_old/news/banners', data), // 获取banner列表

  updateBanner: (data) => PATCH(`/v1/forward/cms_old/news/banners/${data.id}`, data), // 编辑banner -- 修改状态

  createBanner: (data) => POST('/v1/forward/cms_old/news/banners', data), // 新建banner

  /* ================== 标签管理 ================== */

  getInfoTagList: (data) => GET('/v1/forward/cms_old/news/tags?include=articles', data), // 资讯信息标签列表
  addTags: (data) => POST('/v1/forward/cms_old/news/tags', data), // 新增资讯信息标签
  edietTags: (data) => PATCH(`/v1/forward/cms_old/news/tags/${data.id}`, data), // 修改资讯信息标签
  delTags: (data) => DELETE(`/v1/forward/cms_old/news/tags/${data.id}`, data), // 删除资讯信息标签

  /* ================== 资讯分类 ================== */

  getClassify: (data) => GET('/v1/forward/cms_old/news/categories?include=articles', data), //  获取分类列表
  getDocList: (data) => GET('/v1/forward/cms_old/news/articles?include=tags,categories', data), //  获取资讯分类列表
  updateDoc: (data) => PATCH(`/v1/forward/cms_old/news/articles/${data.id}`, data), //  更新文章
  addDoc: (data) => POST('/v1/forward/cms_old/news/articles', data), //  新增文章
  addClassify: (data) => POST('/v1/forward/cms_old/news/categories', data), // 新增分类
  updateClassify: (data) => PATCH(`/v1/forward/cms_old/news/categories/${data.id}`, data), // 编辑分类

  updateInfoImage: (data) => POSTFILE('/v1/forward/cms_old/common/images', data), //  统一上传图片接口
  // 投融资数据
  getFianceTaglist: (data) => GET('/v1/forward/cms_old/investments/fields?include=corporations', data), //  获取投融资标签列表
  addFianceTag: (data) => POST('/v1/forward/cms_old/investments/fields', data), //  新增投融资标签
  edietFianceTag: (data) => PATCH(`/v1/forward/cms_old/investments/fields/${data.id}`, data), //  编辑投融资标签
  delFianceTag: (data) => DELETE(`/v1/forward/cms_old/investments/fields/${data.id}`, data), //  删除投融资标签

  companyList: (data) => GET('/v1/forward/cms_old/investments/projects?include=tags,events', data), //  投融资公司列表
  addCompany: (data) => POST('/v1/forward/cms_old/investments/projects', data), //  新增公司
  updateCompany: (data) => PATCH(`/v1/forward/cms_old/investments/projects/${data.id}`, data), //  更新公司
  deleteCompany: (data) => DELETE(`/v1/forward/cms_old/investments/projects/${data.id}`, data), //  删除公司

  addFinanceInfo: (data) => POST('/v1/forward/cms_old/investments/events', data), //  新增投融资
  updateFinanceInfo: (data) => PATCH(`/v1/forward/cms_old/investments/events/${data.id}`, data), //  更新投融资
  deleteFinanceInfo: (data) => DELETE(`/v1/forward/cms_old/investments/events/${data.id}`, data) //  删除投融资
}
export default infoNews
