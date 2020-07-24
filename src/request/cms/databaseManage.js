import {
  GET,
  PATCH,
  POST,
  DELETE,
  PUT
} from '../http'

const dataBaseManage = {
  // ----------数据替换相关------------------
  dataReplacementList: (data) => GET('/v1/forward/cms_old/database/table/replace', data), // 数据替换列表
  replaceAdd: (data) => POST('/v1/forward/cms_old/database/table/replace', data), // 数据替换增加
  replaceEdiet: (data) => PATCH(`/v1/forward/cms_old/database/table/replace/${data.id}`, data), // 数据替换编辑
  replaceDel: (data) => DELETE(`/v1/forward/cms_old/database/table/replace/${data.id}`, data), // 数据替换删除
  replaceRuleRun: (data) => PUT(`/v1/forward/cms_old/database/table/replace/${data.id}/run`, data), // 数据替换删除
  // 数据备注相关
  dataRemarkList: (data) => GET('/v1/forward/cms_old/database/table/remark', data), // 数据备注列表
  dataRemarkAdd: (data) => POST('/v1/forward/cms_old/database/table/remark', data), // 数据备注增加
  dataRemarkEdiet: (data) => PATCH(`/v1/forward/cms_old/database/table/remark/${data.id}`, data), // 数据备注编辑
  dataRemarkDel: (data) => DELETE(`/v1/forward/cms_old/database/table/remark/${data.id}`, data), // 数据备注删除
  dataRemarkRuleRun: (data) => PUT(`/v1/forward/cms_old/database/table/remark/${data.id}/run`, data), // 数据备注执行规则

  // ----------编码匹配相关------------------
  codeMatchList: (data) => GET('/v1/forward/cms_old/database/table/matching', data), // 编码匹配列表
  matchTableNames: (data) => GET('/v1/forward/cms_old/database/table/matching/filters/tables', data), // 获取表名称筛选项列表
  matchFieldList: (data) => GET('/v1/forward/cms_old/database/table/matching/filters/fields', data), // 获取字段筛选项列表
  PerformMatch: (data) => POST(`/v1/forward/cms_old/database/table/matching/${data.id}/run`), // 执行匹配
  codeMatchAdd: (data) => POST('/v1/forward/cms_old/database/table/matching', data), // 编码匹配创建
  codeMatchEdit: (data) => PUT(`/v1/forward/cms_old/database/table/matching/${data.id}`, data), // 编码匹配编辑
  codeMatchDel: (data) => DELETE(`/v1/forward/cms_old/database/table/matching/${data.id}`), // 编码匹配删除
  tableNameSelect: (data) => GET('/v1/forward/cms_old/database/tables', data), // 获取新增/编辑 -- 下拉列表 -- 表名称
  fieldNameSelect: (data) => GET(`/v1/forward/cms_old/database/tables/${data.id}/fields`, data) // 获取新增/编辑 -- 下拉列表 -- 字段
}
export default dataBaseManage
