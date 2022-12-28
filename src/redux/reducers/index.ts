import { combineReducers } from '@reduxjs/toolkit';
import { testSlice } from './TestSlice';
import { roadMapSlice } from './RoadMapSlice';
import { loginFormSlice } from './LoginFormSlice';

const reducer = combineReducers({
  test: testSlice.reducer,
  roadMap: roadMapSlice.reducer,
  loginForm: loginFormSlice.reducer,
});

export default reducer;
