import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track } from './playerSlice';

interface PlaylistState {
  playlist: Track[];
  favorites: Track[];
}

const initialState: PlaylistState = {
  playlist: JSON.parse(localStorage.getItem('playlist') || '[]'),
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    addToPlaylist: (state, action: PayloadAction<Track>) => {
      const exists = state.playlist.find(track => track.id === action.payload.id);
      if (!exists) {
        state.playlist.push(action.payload);
        localStorage.setItem('playlist', JSON.stringify(state.playlist));
      }
    },
    removeFromPlaylist: (state, action: PayloadAction<string>) => {
      state.playlist = state.playlist.filter(track => track.id !== action.payload);
      localStorage.setItem('playlist', JSON.stringify(state.playlist));
    },
    addToFavorites: (state, action: PayloadAction<Track>) => {
      const exists = state.favorites.find(track => track.id === action.payload.id);
      if (!exists) {
        state.favorites.push(action.payload);
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(track => track.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    clearPlaylist: (state) => {
      state.playlist = [];
      localStorage.setItem('playlist', JSON.stringify(state.playlist));
    },
  },
});

export const {
  addToPlaylist,
  removeFromPlaylist,
  addToFavorites,
  removeFromFavorites,
  clearPlaylist,
} = playlistSlice.actions;

export default playlistSlice.reducer;