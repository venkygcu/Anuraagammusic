import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setCurrentTrack, setQueue } from '../../store/slices/playerSlice';
import { addToPlaylist, removeFromFavorites } from '../../store/slices/playlistSlice';
import { Track } from '../../store/slices/playerSlice';
import TrackCard from '../../components/common/TrackCard';
import EmptyState from '../../components/common/EmptyState';
import PageHeader from '../../components/common/PageHeader';

const Favorites: React.FC = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state: RootState) => state.playlist);

  const handlePlay = (track: Track) => {
    dispatch(setCurrentTrack(track));
    dispatch(setQueue(favorites));
  };

  const handleAddToPlaylist = (track: Track) => {
    dispatch(addToPlaylist(track));
  };

  const handleToggleFavorite = (track: Track) => {
    dispatch(removeFromFavorites(track.id));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <PageHeader
        title="Your Favorites"
        subtitle="Songs you've hearted and love to listen to"
      />

      <Grid container spacing={3}>
        {favorites.length > 0 ? (
          favorites.map((song: Track) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={song.id}>
              <TrackCard
                track={song}
                isFavorite={true}
                onPlay={handlePlay}
                onAddToPlaylist={handleAddToPlaylist}
                onToggleFavorite={handleToggleFavorite}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <EmptyState
              title="No favorite songs yet"
              subtitle="Start hearting songs you love to see them here!"
              icon={<Favorite sx={{ fontSize: 64 }} />}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Favorites;