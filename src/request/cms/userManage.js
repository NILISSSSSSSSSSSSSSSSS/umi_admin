import {
  GET,
  PUT,
  PATCH,
  POST
} from '../http'

const userManage = {

  /* ================== 个人认证 ================== */
  personTableList: (data) => GET('/v1/forward/cms_old/auth/users', data), // 个人认证 -- 普通用户列表
  personInfoUpdate: (data) => PUT(`/v1/forward/cms_old/auth/users/${data.id}&include=databases`, data), // 个人认证 -- 更新用户信息/状态
  personPermissionsList: (data) => GET(`/v1/forward/cms_old/auth/users/${data.id}/databases`, data), // 个人数据库权限列表
  personPermissionsUpdate: (data) => PUT(`/v1/forward/cms_old/auth/users/${data.id}/databases?include=databases`, data), // 个人数据库权限更新

  /* ================== 企业认证 ================== */
  enterpriseAdd: (data) => POST('/v1/forward/cms_old/auth/enterprises', data), // 新增企业
  enterpriseUpdate: (data) => PATCH(`/v1/forward/cms_old/auth/enterprises/${data.id}`, data), // 修改企业
  resetEnterpriPassword: (data) => POST(`/v1/forward/cms_old/auth/enterprises/${data.id}/reset_password`, data), // 企业列表-重置密码
  enterpriseList: (data) => GET('/v1/forward/cms_old/auth/enterprises', data),
  databaseCatalogList: (data) => GET('/v1/forward/cms_old/database/categories', data), // 数据库分类
  enterprisePermissionsList: (data) => GET(`/v1/forward/cms_old/auth/enterprises/${data.id}/databases`, data), // 企业数据库权限列表
  enterprisePermissionsUpdate: (data) => PATCH(`/v1/forward/cms_old/auth/enterprises/${data.id}/databases?include=databases`, data) // 企业数据库权限更新
}
export default userManage
