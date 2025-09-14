import React from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  List,
  Typography,
  Stack,
  Chip,
  Divider,
} from '@mui/material';
import {
  PlayArrow,
  QueueMusic,
  Favorite,
  Clear,
  Shuffle,
  PlaylistPlay,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setCurrentTrack, setQueue } from '../../store/slices/playerSlice';
import { removeFromPlaylist, removeFromFavorites, clearPlaylist } from '../../store/slices/playlistSlice';
import { Track } from '../../store/slices/playerSlice';
import { PlaylistItem, EmptyState, PageHeader, StatCard, ActionButton } from '../../components/common';

const Playlist: React.FC = () => {
  const dispatch = useDispatch();
  const { playlist, favorites } = useSelector((state: RootState) => state.playlist);

  const handlePlay = (track: Track, queue: Track[]) => {
    dispatch(setCurrentTrack(track));
    dispatch(setQueue(queue));
  };

  const handlePlayAll = (tracks: Track[]) => {
    if (tracks.length > 0) {
      dispatch(setCurrentTrack(tracks[0]));
      dispatch(setQueue(tracks));
    }
  };

  const handleShufflePlay = (tracks: Track[]) => {
    if (tracks.length > 0) {
      const shuffled = [...tracks].sort(() => Math.random() - 0.5);
      dispatch(setCurrentTrack(shuffled[0]));
      dispatch(setQueue(shuffled));
    }
  };

  const handleRemoveFromPlaylist = (trackId: string) => {
    dispatch(removeFromPlaylist(trackId));
  };

  const handleRemoveFromFavorites = (trackId: string) => {
    dispatch(removeFromFavorites(trackId));
  };

  const handleClearPlaylist = () => {
    dispatch(clearPlaylist());
  };

  const PlaylistSection = ({ title, tracks, onRemove, icon, emptyMessage }: {
    title: string;
    tracks: Track[];
    onRemove: (id: string) => void;
    icon: React.ReactNode;
    emptyMessage: string;
  }) => (
    <Card sx={{ height: 'fit-content' }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          {icon}
          <Typography variant="h5" fontWeight={600}>
            {title}
          </Typography>
          <Chip label={tracks.length} color="primary" size="small" />
        </Stack>

        {tracks.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <ActionButton
              variant="contained"
              startIcon={<PlayArrow />}
              onClick={() => handlePlayAll(tracks)}
              size="small"
            >
              Play All
            </ActionButton>
            <ActionButton
              variant="outlined"
              startIcon={<Shuffle />}
              onClick={() => handleShufflePlay(tracks)}
              size="small"
            >
              Shuffle
            </ActionButton>
            {title === 'My Playlist' && (
              <ActionButton
                variant="text"
                startIcon={<Clear />}
                onClick={handleClearPlaylist}
                color="error"
                size="small"
              >
                Clear All
              </ActionButton>
            )}
          </Stack>
        )}

        <Divider sx={{ mb: 2 }} />

        {tracks.length === 0 ? (
          <EmptyState
            title={emptyMessage}
            icon={title === 'My Playlist' ? <PlaylistPlay sx={{ fontSize: 48 }} /> : <Favorite sx={{ fontSize: 48 }} />}
          />
        ) : (
          <List disablePadding>
            {tracks.map((track) => (
              <PlaylistItem
                key={track.id}
                track={track}
                onPlay={(track) => handlePlay(track, tracks)}
                onRemove={onRemove}
              />
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <PageHeader
        title="Your Music"
        subtitle="Manage your playlists and favorite songs"
      />

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<QueueMusic sx={{ fontSize: 40 }} />}
            value={playlist.length}
            label="Songs in Playlist"
            color="primary.main"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<Favorite sx={{ fontSize: 40 }} />}
            value={favorites.length}
            label="Favorite Songs"
            color="error.main"
          />
        </Grid>
      </Grid>

      {/* Playlists */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <PlaylistSection
            title="My Playlist"
            tracks={playlist}
            onRemove={handleRemoveFromPlaylist}
            icon={<QueueMusic color="primary" />}
            emptyMessage="No songs in your playlist. Add some songs to get started!"
          />
        </Grid>
        
        <Grid item xs={12} lg={6}>
          <PlaylistSection
            title="Favorites"
            tracks={favorites}
            onRemove={handleRemoveFromFavorites}
            icon={<Favorite color="error" />}
            emptyMessage="No favorite songs yet. Start hearting songs you love!"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Playlist;