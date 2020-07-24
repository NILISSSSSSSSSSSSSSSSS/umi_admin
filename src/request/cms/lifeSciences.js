import {
  GET,
  POST,
  PUT,
  DELETE

} from '../http'

const lifeSciences = {
  // 专题
  gettDocCategory: (data) => GET('/v1/forward/cms_old/library/category/listTree', data), // 获取文档分类型
  getSubjectCategory: (data) => GET('/v1/forward/cms_old/library/columnCategory/listTree', data), // 获取专题分类型
  getSubjectList: (data) => GET('/v1/forward/cms_old/library/columns', data), // 获取专题列表
  addSubject: (data) => POST('/v1/forward/cms_old/library/columns', data), // 新增专题列表
  edietSubject: (data) => PUT(`/v1/forward/cms_old/library/columns/${data.id}`, data), // 编辑专题列表

  documentList: (data) => GET('/v1/forward/cms_old/library/documents', data), //  获取文档列表
  documenUpdate: (data) => PUT(`/v1/forward/cms_old/library/documents/${data.id}`, data), //  编辑文档
  documenCreate: (data) => POST('/v1/forward/cms_old/library/document/relate', data), //  新建文档

  documentSubjectList: (data) => GET(`/v1/forward/cms_old/library/column/${data.id}/documents`, data), // 获取专题文档列表
  documentSubjectAdd: (data) => POST(`/v1/forward/cms_old/library/column/${data.id}/document/${data.documentId}`, data), // 添加专题文档
  documentSubjectDel: (data) => DELETE(`/v1/forward/cms_old/library/column/${data.id}/document/${data.documentId}`, data), // 移除专题文档

  // 分类管理
  getDocxList: () => GET('/v1/forward/cms_old/library/category/listTree'), // 获取分类 -- 文档分类列表
  getTheamList: () => GET('/v1/forward/cms_old/library/columnCategory/listTree'), // 获取分类 -- 专题分类列表
  createDocxClass: (data) => POST('/v1/forward/cms_old/library/categories', data), // 创建分类 -- 创建文档分类
  createTheam: (data) => POST('/v1/forward/cms_old/library/columnCategories', data), // 创建分类 -- 创建专题分类
  updateDocxClass: (data) => PUT(`/v1/forward/cms_old/library/categories/${data.id}`, data), // 编辑分类 -- 编辑文档分类
  updateTheam: (data) => PUT(`/v1/forward/cms_old/library/columnCategories/${data.id}`, data), // 编辑分类 -- 编辑专题分类

  // 标签管理
  getTagList: (data) => GET('/v1/forward/cms_old/library/tags', data), // 标签 -- 获取标签列表
  addTags: (data) => POST('/v1/forward/cms_old/library/tags', data), // 标签 -- 创建标签
  updateTags: (data) => PUT(`/v1/forward/cms_old/library/tags/${data.id}`, data), // 标签 -- 编辑标签
  deleteTags: (data) => DELETE(`/v1/forward/cms_old/library/tags/${data.id}`, data) // 标签 -- 删除标签

}
export default lifeSciences
