import { combineReducers } from '@reduxjs/toolkit';
import auth from './auth';

const reducer = combineReducers({
  auth: auth.reducer,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
