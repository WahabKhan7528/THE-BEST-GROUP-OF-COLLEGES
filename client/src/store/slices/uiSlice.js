import { createSlice } from '@reduxjs/toolkit';

const getInitialDarkMode = () => {
  const storedTheme = sessionStorage.getItem('portal-theme');
  if (storedTheme === 'light') return false;
  return true;
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDarkMode: getInitialDarkMode(),
    toastMessage: null,
    toastType: null,
    confirmDialog: null,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      sessionStorage.setItem('portal-theme', state.isDarkMode ? 'dark' : 'light');
    },
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
      sessionStorage.setItem('portal-theme', action.payload ? 'dark' : 'light');
    },
    showToast: (state, action) => {
      state.toastMessage = action.payload.message;
      state.toastType = action.payload.type;
    },
    clearToast: (state) => {
      state.toastMessage = null;
      state.toastType = null;
    },
    setConfirmDialog: (state, action) => {
      state.confirmDialog = action.payload;
    },
    clearConfirmDialog: (state) => {
      state.confirmDialog = null;
    },
  },
});

export const { toggleDarkMode, setDarkMode, showToast, clearToast, setConfirmDialog, clearConfirmDialog } = uiSlice.actions;
export default uiSlice.reducer;
