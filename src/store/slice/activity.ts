import { createSlice } from '@reduxjs/toolkit';
import { luckyWheelDetailData } from '@src/common/mock';

// 定义状态
export const activitySlice = createSlice({
  // 定义状态名称
  name: 'activity',
  // 定义状态初始值
  initialState: {
    activitySort: [] as Record<string, any>[], // 活动分类
    activityList: [] as Record<string, any>[], // 活动列表
    luckyWheelDetail: null as Record<string, any> | null, // 幸运大转盘活动详情
  },
  // 定义状态操作方法
  reducers: {
    // 设置活动分类
    setActivitySort: (state, activitySort) => {
      state.activitySort = activitySort.payload;
    },
    // 设置活动列表
    setActivityList: (state, activityList) => {
      state.activityList = activityList.payload;
    },
    // 设置幸运大转盘活动详情
    setLuckyWheelDetail: (state, luckyWheelDetail) => {
      state.luckyWheelDetail = luckyWheelDetail.payload;
    },
  },
});

// 导出活动分类(外部使用 useSelector 获取动态值)
export const selectActivitySort = (state: any) => state.activity.activitySort;
// 导出活动列表(外部使用 useSelector 获取动态值)
export const selectActivityList = (state: any) => state.activity.activityList;
// 导出幸运大转盘活动详情(外部使用 useSelector 获取动态值)
export const selectLuckyWheelDetail = (state: any) => state.activity.luckyWheelDetail;

// 导出action(在 reducers 中定义的函数,外部使用 useDispatch 调用)
export const { setActivitySort, setActivityList, setLuckyWheelDetail } = activitySlice.actions;

/**
 * 自定义异步action(外部使用 useDispatch 调用): 获取幸运大转盘活动详情
 */
export const getLuckyWheelDetail: any = () => (dispatch: any) => {
  dispatch(setLuckyWheelDetail(luckyWheelDetailData));
};

// 导出默认项
export default activitySlice.reducer;
