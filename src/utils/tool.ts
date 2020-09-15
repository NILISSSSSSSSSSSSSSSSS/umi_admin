import { removeToken } from './token'
import { history } from 'umi';
//* *退出登录
export function loginOutClear() {
  removeToken()
  // store.commit('SET_USERINFO', {})
  history.push('/login')
}