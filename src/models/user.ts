import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import apiList from '@/request/api.js'
export interface UserModelState {
  userInfo: object; // 用户信息
}
export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    getUserList: Effect;
  };
  reducers: {
    setUserInfo: ImmerReducer<UserModelState>;

  };
  subscriptions: { setup: Subscription };
}
const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    userInfo: JSON.parse(localStorage.getItem('userInfo') || JSON.stringify({ name: "小甘" })),
  },
  effects: {
    * getUserList({ payload }, { call, put }) {
      try {
        const data = yield (apiList.getInfo().then(res => {
          return res
        }))
        yield put({ type: 'setUserInfo', payload: { userInfo: data } })
        payload.resolve(data);
      }
      catch (error) {
        payload.reject(error);
      }
      // const data = yield (apiList.getInfo().then(res => {
      //   return res
      // }))
      // console.log(data)
      // yield put({ type: 'setUserInfo', payload: { userInfo: data } })
    }
  },
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload.userInfo || '{}';
      localStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo))
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'query',
          })
        }
      });
    }
  }
};
export default UserModel;