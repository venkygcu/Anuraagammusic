import React from 'react';
import { Stack, Typography, Slider } from '@mui/material';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  onSeekStart?: () => void;
  onSeekEnd?: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  onSeek,
  onSeekStart,
  onSeekEnd,
}) => {
  const formatTime = (time: number): string => {
    if (!Number.isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ width: '100%', maxWidth: 500 }}>
      <Typography variant="caption" color="text.secondary" sx={{ minWidth: 40 }}>
        {formatTime(currentTime)}
      </Typography>
      <Slider
        value={currentTime}
        max={duration || 0}
        onChange={(_, value) => onSeek(value as number)}
        onMouseDown={onSeekStart}
        onMouseUp={onSeekEnd}
        size="small"
        sx={{ flex: 1 }}
      />
      <Typography variant="caption" color="text.secondary" sx={{ minWidth: 40 }}>
        {formatTime(duration)}
      </Typography>
    </Stack>
  );
};

export default ProgressBar;