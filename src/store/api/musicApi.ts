import { createApi } from '@reduxjs/toolkit/query/react';
import { Track } from '../slices/playerSlice';
import { mockSongs } from '../../data/mockSongs';

interface SearchResponse {
  results: Track[];
}

// Normalize tracks to ensure consistent fields across backend and mock
const normalizeTracks = (tracks: any[]): Track[] => {
  return tracks.map((t) => ({
    id: String(t.id ?? t.title),
    title: t.title,
    artist: t.artist,
    album: t.album ?? 'Unknown Album',
    cover: t.cover,
    language: t.language ?? 'Unknown',
    // prefer mp3/m4a fallbacks if available, else previewUrl
    previewMp3: t.previewMp3,
    previewM4a: t.previewM4a,
    previewUrl: t.previewUrl,
  }));
};

// Mock query function for when backend is not available
const mockQueryFn = async (endpoint: string): Promise<SearchResponse> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  if (endpoint === '/songs') {
    return { results: normalizeTracks(mockSongs as any) };
  }
  if (endpoint.startsWith('/search?q=')) {
    const query = decodeURIComponent(endpoint.split('q=')[1]).toLowerCase();
    const filteredSongs = mockSongs.filter(song =>
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      song.album.toLowerCase().includes(query)
    );
    return { results: normalizeTracks(filteredSongs as any) };
  }
  return { results: [] };
};

export const musicApi = createApi({
  reducerPath: 'musicApi',
  baseQuery: async ({ url }) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Network error');
      const json = await res.json();
      // normalize backend payload if it follows { results }
      const results = Array.isArray(json)
        ? json
        : Array.isArray(json.results)
          ? json.results
          : [];
      return { data: { results: normalizeTracks(results) } as SearchResponse };
    } catch (e) {
      // Signal to use queryFn fallback (we will not use this baseQuery error)
      return { error: { status: 'FETCH_ERROR', error: String(e) } as any };
    }
  },
  tagTypes: ['Songs'],
  endpoints: (builder) => ({
    getAllSongs: builder.query<SearchResponse, void>({
      async queryFn(_arg, _api, _extraOptions, baseQuery) {
        const res: any = await baseQuery({ url: '/api/songs' } as any);
        if (!res.error) return { data: res.data };
        const mockData = await mockQueryFn('/songs');
        return { data: mockData };
      },
      providesTags: ['Songs'],
    }),
    searchSongs: builder.query<SearchResponse, string>({
      async queryFn(query, _api, _extraOptions, baseQuery) {
        const res: any = await baseQuery({ url: `/api/search?q=${encodeURIComponent(query)}` } as any);
        if (!res.error) return { data: res.data };
        const mockData = await mockQueryFn(`/search?q=${query}`);
        return { data: mockData };
      },
    }),
  }),
});

export const { useGetAllSongsQuery, useSearchSongsQuery } = musicApi;