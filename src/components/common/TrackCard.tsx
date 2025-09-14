import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Stack,
  Chip,
  Box,
  Tooltip,
} from '@mui/material';
import {
  PlayArrow,
  Favorite,
  FavoriteBorder,
  PlaylistAdd,
} from '@mui/icons-material';
import { Track } from '../../store/slices/playerSlice';

interface TrackCardProps {
  track: Track;
  isFavorite: boolean;
  onPlay: (track: Track) => void;
  onAddToPlaylist: (track: Track) => void;
  onToggleFavorite: (track: Track) => void;
}

const TrackCard: React.FC<TrackCardProps> = ({
  track,
  isFavorite,
  onPlay,
  onAddToPlaylist,
  onToggleFavorite,
}) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={track.cover}
          alt={track.title}
          sx={{ objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            p: 1,
            opacity: 0,
            transition: 'opacity 0.3s ease',
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          <IconButton
            onClick={() => onPlay(track)}
            sx={{
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'scale(1.1)',
              },
            }}
          >
            <PlayArrow />
          </IconButton>
        </Box>
      </Box>
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" fontWeight={600} noWrap sx={{ mb: 0.5 }}>
          {track.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 1 }}>
          {track.artist}
        </Typography>
        
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip label={track.language} size="small" variant="outlined" color="primary" />
          <Chip label={track.album} size="small" variant="outlined" />
        </Stack>
        
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 'auto' }}
        >
          <Tooltip title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
            <IconButton
              onClick={() => onToggleFavorite(track)}
              color={isFavorite ? 'error' : 'default'}
              size="small"
            >
              {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Add to playlist">
            <IconButton
              onClick={() => onAddToPlaylist(track)}
              color="primary"
              size="small"
            >
              <PlaylistAdd />
            </IconButton>
          </Tooltip>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TrackCard;