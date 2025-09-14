import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  TextField,
  InputAdornment,
  Grid,
  IconButton,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear,
  SearchOff,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useSearchSongsQuery, useGetAllSongsQuery } from '../../store/api/musicApi';
import { setCurrentTrack, setQueue } from '../../store/slices/playerSlice';
import { addToPlaylist, addToFavorites, removeFromFavorites } from '../../store/slices/playlistSlice';
import { showNotification } from '../../store/slices/uiSlice';
import { Track } from '../../store/slices/playerSlice';
import { TrackCard, LoadingSkeleton, EmptyState, PageHeader, SearchInput } from '../../components/common';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [artistFilter, setArtistFilter] = useState('');
  
  const { favorites } = useSelector((state: RootState) => state.playlist);
  const { data: allSongsData } = useGetAllSongsQuery();
  const { data: searchData, isLoading: isSearching } = useSearchSongsQuery(debouncedQuery, {
    skip: !debouncedQuery,
  });

  const allSongs = allSongsData?.results || [];
  const searchResults = searchData?.results || [];

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Get unique languages and artists for filters
  const languages = Array.from(new Set(allSongs.map(song => song.language)));
  const artists = Array.from(new Set(allSongs.map(song => song.artist)));

  // Filter results
  const filteredResults = (debouncedQuery ? searchResults : allSongs).filter(song => {
    const matchesLanguage = !languageFilter || song.language === languageFilter;
    const matchesArtist = !artistFilter || song.artist === artistFilter;
    return matchesLanguage && matchesArtist;
  });

  const handlePlay = (track: Track) => {
    dispatch(setCurrentTrack(track));
    dispatch(setQueue(filteredResults));
  };

  const handleAddToPlaylist = (track: Track) => {
    dispatch(addToPlaylist(track));
    dispatch(showNotification({ 
      message: `"${track.title}" added to playlist!`, 
      severity: 'success' 
    }));
  };

  const handleToggleFavorite = (track: Track) => {
    const isFavorite = favorites.some(fav => fav.id === track.id);
    if (isFavorite) {
      dispatch(removeFromFavorites(track.id));
      dispatch(showNotification({ 
        message: `"${track.title}" removed from favorites`, 
        severity: 'info' 
      }));
    } else {
      dispatch(addToFavorites(track));
      dispatch(showNotification({ 
        message: `"${track.title}" added to favorites!`, 
        severity: 'success' 
      }));
    }
  };

  const isFavorite = (trackId: string) => {
    return favorites.some(fav => fav.id === trackId);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setDebouncedQuery('');
  };

  const clearFilters = () => {
    setLanguageFilter('');
    setArtistFilter('');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <PageHeader
        title="Search Music"
        subtitle="Find your favorite songs, artists, and albums"
      />

      {/* Search Bar */}
      <Box sx={{ mb: 4 }}>
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search for songs, artists, or albums..."
          onClear={clearSearch}
        />
      </Box>

      {/* Filters */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Language</InputLabel>
          <Select
            value={languageFilter}
            label="Language"
            onChange={(e) => setLanguageFilter(e.target.value)}
          >
            <MenuItem value="">All Languages</MenuItem>
            {languages.map(language => (
              <MenuItem key={language} value={language}>
                {language}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Artist</InputLabel>
          <Select
            value={artistFilter}
            label="Artist"
            onChange={(e) => setArtistFilter(e.target.value)}
          >
            <MenuItem value="">All Artists</MenuItem>
            {artists.map(artist => (
              <MenuItem key={artist} value={artist}>
                {artist}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {(languageFilter || artistFilter) && (
          <IconButton onClick={clearFilters} color="primary">
            <Clear />
          </IconButton>
        )}
      </Stack>

      {/* Results Info */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={600}>
          {debouncedQuery ? `Search Results for "${debouncedQuery}"` : 'All Songs'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {filteredResults.length} songs found
        </Typography>
      </Box>

      {/* Results Grid */}
      <Grid container spacing={3}>
        {(isSearching && debouncedQuery) ? (
          <LoadingSkeleton count={8} />
        ) : filteredResults.length > 0 ? (
          filteredResults.map((song: Track) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={song.id}>
              <TrackCard
                track={song}
                isFavorite={isFavorite(song.id)}
                onPlay={handlePlay}
                onAddToPlaylist={handleAddToPlaylist}
                onToggleFavorite={handleToggleFavorite}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <EmptyState
              title={debouncedQuery ? 'No results found' : 'No songs available'}
              subtitle={debouncedQuery ? 'Try adjusting your search or filters' : 'Check back later for new music!'}
              icon={<SearchOff sx={{ fontSize: 64 }} />}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Search;