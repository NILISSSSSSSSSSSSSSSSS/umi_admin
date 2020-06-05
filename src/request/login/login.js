import { GET, POST } from '../http'

// 登录认证
const login = {
  // 登录
  loginByPassword: (data) => POST('/v1/account/login', data),
  // 退出
  onLogout: (data) => POST('/v1/account/logout', data),
  // 用户信息
  getInfo: (data) => POST('/v1/account/me', data),
  // 用户权限
  getPermissions: (data) => GET('', data)
}

export default login
