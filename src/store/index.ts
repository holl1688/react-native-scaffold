import { configureStore } from '@reduxjs/toolkit';
import activityReducer from './slice/activity';
import appReducer from './slice/app';

export default configureStore({
  reducer: {
    app: appReducer,
    activity: activityReducer,
  },
});
