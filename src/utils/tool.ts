import { removeToken } from './token'
import { history, getDvaApp } from 'umi';
//* *退出登录
export function loginOutClear() {
  removeToken()
  getDvaApp()._store.dispatch({ type: 'user/setUserInfo', payload: {} })
  history.push('/login')
}