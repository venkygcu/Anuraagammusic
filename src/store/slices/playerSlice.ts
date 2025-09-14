import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  language: string;
  previewUrl?: string;
  previewMp3?: string;
  previewM4a?: string;
}

interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  muted: boolean;
  currentTime: number;
  duration: number;
  shuffle: boolean;
  repeat: 'off' | 'one' | 'all';
  queue: Track[];
  currentIndex: number;
}

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  volume: 1,
  muted: false,
  currentTime: 0,
  duration: 0,
  shuffle: false,
  repeat: 'off',
  queue: [],
  currentIndex: -1,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
      state.isPlaying = true;
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    toggleMute: (state) => {
      state.muted = !state.muted;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle;
    },
    setRepeat: (state, action: PayloadAction<'off' | 'one' | 'all'>) => {
      state.repeat = action.payload;
    },
    setQueue: (state, action: PayloadAction<Track[]>) => {
      state.queue = action.payload;
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
  },
});

export const {
  setCurrentTrack,
  togglePlayPause,
  setVolume,
  toggleMute,
  setCurrentTime,
  setDuration,
  toggleShuffle,
  setRepeat,
  setQueue,
  setCurrentIndex,
} = playerSlice.actions;

export default playerSlice.reducer;