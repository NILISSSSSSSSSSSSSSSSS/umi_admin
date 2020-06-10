import {
  GET, POST, PATCH, DELETE, POSTFILE
} from '../http'

const infoNews = {
  updateInfoImage: (data) => POSTFILE('/v1/forward/cms_old/common/images', data), //  统一上传图片接口
  infoBanner: (data) => GET('/v1/forward/cms_old/news/banners', data), // 获取banner列表

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
