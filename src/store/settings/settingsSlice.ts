import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectableTheme } from '../../utils/types';

export interface SettingsState {
  theme: SelectableTheme;
  token: String;
}

const initialState: SettingsState = {
  theme: 'dark',
  token: ''
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<SelectableTheme>) => {
      state.theme = action.payload;
    },
    setToken: (state, action: PayloadAction<String>) =>{
      state.token = action.payload;
    }
  },
});

export const { setTheme } = settingsSlice.actions;
export const { setToken } = settingsSlice.actions;

export default settingsSlice.reducer;
