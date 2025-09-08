import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { AppUser } from '@/types/userData';
import { isTokenValid } from '@/utils/firebase/tokenValidation';

export interface UserState {
  user: AppUser | null;
  isValid: boolean;
}

const initialState: UserState = {
  user: null,
  isValid: false,
};

export const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AppUser | null>) => {
      state.user = action.payload;
      state.isValid = action.payload
        ? isTokenValid(action.payload.expiresIn)
        : false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isValid = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
