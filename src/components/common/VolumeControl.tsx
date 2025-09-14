import React from 'react';
import { Stack, IconButton, Slider } from '@mui/material';
import { VolumeUp, VolumeOff } from '@mui/icons-material';

interface VolumeControlProps {
  volume: number;
  muted: boolean;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  width?: number;
}

const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  muted,
  onVolumeChange,
  onToggleMute,
  width = 80,
}) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <IconButton onClick={onToggleMute} size="small">
        {muted || volume === 0 ? <VolumeOff /> : <VolumeUp />}
      </IconButton>
      <Slider
        value={muted ? 0 : volume}
        max={1}
        step={0.01}
        onChange={(_, value) => onVolumeChange(value as number)}
        size="small"
        sx={{ width }}
      />
    </Stack>
  );
};

export default VolumeControl;