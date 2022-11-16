import { combineReducers } from '@reduxjs/toolkit';
import auth from './auth';
import schedule from './schedule';

const reducer = combineReducers({
  auth: auth.reducer,
  schedule: schedule.reducer,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
