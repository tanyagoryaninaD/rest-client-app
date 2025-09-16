import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { VariablesStorage } from '@/types/variables';

import type { RootState } from '..';

export interface VariablesState {
  variables: VariablesStorage;
}

const initialState: VariablesState = {
  variables: {},
};

export const userSlice = createSlice({
  name: 'variables',
  initialState,
  reducers: {
    addVariable: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      state.variables[action.payload.name] = action.payload.value;
    },
    removeVariable: (state, action: PayloadAction<string>) => {
      state.variables = Object.fromEntries(
        Object.entries(state.variables).filter(
          ([key]) => key !== action.payload
        )
      );
    },
    restoreVariables: (state, action: PayloadAction<VariablesStorage>) => {
      state.variables = action.payload;
    },
  },
});

export const { addVariable, removeVariable, restoreVariables } =
  userSlice.actions;
export default userSlice.reducer;

export const selectVariable = (name: string) => (state: RootState) =>
  state.variables.variables[name];

export const selectAllVariables = (state: RootState) =>
  state.variables.variables;
