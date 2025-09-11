import { combineReducers, configureStore } from '@reduxjs/toolkit';

import userReducer from './slicers/userSlicer';
import variablesReducer from './slicers/variables-slice';

const rootReducer = combineReducers({
  user: userReducer,
  variables: variablesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
