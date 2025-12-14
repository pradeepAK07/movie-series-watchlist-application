import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type WatchStatus = 'planned' | 'watching' | 'completed' | 'dropped';

export interface WatchlistItem {
  id: string; // Firestore Document ID
  tmdbId: number; // ID from TMDB
  type: 'movie' | 'series';
  title: string;
  posterPath: string;
  releaseYear?: number;
  genreIds: number[];
  status: WatchStatus;
  rating?: number; // User rating 1-5
  notes?: string;
  totalEpisodes?: number;
  watchedEpisodes?: number;
  updatedAt: number;
}

interface WatchlistState {
  items: WatchlistItem[];
  loading: boolean;
  error: string | null;
  filter: WatchStatus | 'all';
}

const initialState: WatchlistState = {
  items: [],
  loading: false,
  error: null,
  filter: 'all',
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    setWatchlist: (state, action: PayloadAction<WatchlistItem[]>) => {
      state.items = action.payload;
      state.loading = false;
    },
    addToWatchlist: (state, action: PayloadAction<WatchlistItem>) => {
      state.items.push(action.payload);
    },
    removeFromWatchlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateWatchlistItem: (state, action: PayloadAction<WatchlistItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setFilter: (state, action: PayloadAction<WatchStatus | 'all'>) => {
      state.filter = action.payload;
    },
  },
});

export const { 
  setWatchlist, 
  addToWatchlist, 
  removeFromWatchlist, 
  updateWatchlistItem, 
  setLoading, 
  setError,
  setFilter 
} = watchlistSlice.actions;

export default watchlistSlice.reducer;
