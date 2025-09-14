import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  Typography,
  Stack,
  Chip,
} from '@mui/material';
import { PlayArrow, Delete } from '@mui/icons-material';
import { Track } from '../../store/slices/playerSlice';

interface PlaylistItemProps {
  track: Track;
  onPlay: (track: Track) => void;
  onRemove: (trackId: string) => void;
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ track, onPlay, onRemove }) => {
  return (
    <ListItem
      sx={{
        borderRadius: 2,
        mb: 1,
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      <ListItemAvatar>
        <Avatar
          src={track.cover}
          alt={track.title}
          sx={{ width: 48, height: 48 }}
        />
      </ListItemAvatar>
      
      <ListItemText
        primary={
          <Typography variant="body1" fontWeight={600} noWrap>
            {track.title}
          </Typography>
        }
        secondary={
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2" color="text.secondary" noWrap>
              {track.artist}
            </Typography>
            <Chip label={track.language} size="small" variant="outlined" />
          </Stack>
        }
      />
      
      <ListItemSecondaryAction>
        <Stack direction="row" spacing={1}>
          <IconButton
            onClick={() => onPlay(track)}
            color="primary"
            size="small"
          >
            <PlayArrow />
          </IconButton>
          <IconButton
            onClick={() => onRemove(track.id)}
            color="error"
            size="small"
          >
            <Delete />
          </IconButton>
        </Stack>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default PlaylistItem;