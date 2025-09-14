import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

interface UIState {
  notification: NotificationState;
  sidebarOpen: boolean;
}

const initialState: UIState = {
  notification: {
    open: false,
    message: '',
    severity: 'success',
  },
  sidebarOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<{ message: string; severity?: 'success' | 'error' | 'warning' | 'info' }>) => {
      state.notification = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity || 'success',
      };
    },
    hideNotification: (state) => {
      state.notification.open = false;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
  },
});

export const { showNotification, hideNotification, toggleSidebar, setSidebarOpen } = uiSlice.actions;
export default uiSlice.reducer;