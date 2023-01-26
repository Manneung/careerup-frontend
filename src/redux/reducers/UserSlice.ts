import { createSlice } from '@reduxjs/toolkit';
import { getAccessToken } from '../../api/user';

import { IUserData } from '../../interfaces';
import { getUserData, patchPicture } from '../actions/UserAPI';

interface UserState {
  entities: IUserData;
  loading: boolean;
}

const initialState: UserState = {
  entities: {
    address: '',
    age: '',
    username: '',
    gender: '',
    interestField1: '',
    interestField2: '',
    interestField3: '',
    job: '',
    link: '',
    major1: '',
    major2: '',
    phone: '',
    picture: '',
    univ: '',
    nickname: '',
  },
  loading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.entities = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.fulfilled, (state, { payload }) => {
        const isLogin = getAccessToken();
        if (isLogin) {
          state.entities = payload;

          // 프로필 사진 default 값 설정
          if (!payload.picture) {
            state.entities.picture = require('../../assets/profile.jpg');
          }
        }

        state.loading = false;
      })
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(patchPicture.fulfilled, (state, action) => {
        state.entities.picture = action.payload;
      });
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
