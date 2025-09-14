import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { MusicNote } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useGetAllSongsQuery } from '../../store/api/musicApi';
import { setCurrentTrack, setQueue } from '../../store/slices/playerSlice';
import { addToPlaylist, addToFavorites, removeFromFavorites } from '../../store/slices/playlistSlice';
import { showNotification } from '../../store/slices/uiSlice';
import { Track } from '../../store/slices/playerSlice';
import { TrackCard, LoadingSkeleton, EmptyState, PageHeader } from '../../components/common';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { data: songsData, isLoading, error } = useGetAllSongsQuery();
  const { favorites } = useSelector((state: RootState) => state.playlist);
  
  const songs = songsData?.results || [];

  const handlePlay = (track: Track) => {
    dispatch(setCurrentTrack(track));
    dispatch(setQueue(songs));
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

  if (error) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" color="error" textAlign="center">
          Failed to load songs. Please try again later.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <PageHeader
        title="Discover Music"
        subtitle="Explore your favorite songs and discover new ones"
      />

      <Grid container spacing={3}>
        {isLoading ? (
          <LoadingSkeleton count={12} />
        ) : songs.length > 0 ? (
          songs.map((song: Track) => (
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
              title="No songs available"
              subtitle="Check back later for new music!"
              icon={<MusicNote sx={{ fontSize: 64 }} />}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Home;