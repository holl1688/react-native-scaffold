import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { token } from '@src/common/mock';

// 定义状态
export const appSlice = createSlice({
  name: 'app', // 定义状态名称
  initialState: {
    token: '', // 授权令牌,
  },
  reducers: {
    // 设置授权令牌
    setToken: (state, list) => {
      state.token = list.payload;
    },
  },
});

// 导出商户列表(外部使用 useSelector 获取动态值)
export const selectToken = (state: { app: { token: string } }) => state.app.token;

// 导出action(在 reducers 中定义的函数,外部使用 useDispatch 调用)
export const { setToken } = appSlice.actions;

/**
 * 自定义异步action(外部使用 useDispatch 调用): 用户登录
 */
export const loginRequest = () => (dispatch: Dispatch, getState: () => { app: { token: string } }) => {
  const { app } = getState();
  if (app.token) {
    return dispatch(setToken(app.token));
  }
  dispatch(setToken(token));
};

/**
 * 自定义异步action(外部使用 useDispatch 调用): 用户登出
 */
export const logoutRequest = () => (dispatch: Dispatch, getState: () => { app: { token: string } }) => {
  const { app } = getState();
  if (app.token) {
    return dispatch(setToken(''));
  }
};

// 导出默认项
export default appSlice.reducer;
