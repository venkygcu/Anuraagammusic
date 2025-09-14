import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authSlice from './slices/authSlice';
import playerSlice from './slices/playerSlice';
import playlistSlice from './slices/playlistSlice';
import uiSlice from './slices/uiSlice';
import { musicApi } from './api/musicApi';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    player: playerSlice,
    playlist: playlistSlice,
    ui: uiSlice,
    [musicApi.reducerPath]: musicApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(musicApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;