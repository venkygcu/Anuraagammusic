import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
  Avatar,
  useTheme,
} from '@mui/material';
import {
  PlayArrow,
  Pause,
  SkipNext,
  SkipPrevious,
  Shuffle,
  Repeat,
  RepeatOne,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import {
  togglePlayPause,
  setVolume,
  toggleMute,
  setCurrentTime,
  setDuration,
  toggleShuffle,
  setRepeat,
  setCurrentTrack,
  setCurrentIndex,
} from '../../store/slices/playerSlice';
import { VolumeControl, ProgressBar } from '../common';

const MusicPlayer: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [seeking, setSeeking] = useState(false);
  
  const {
    currentTrack,
    isPlaying,
    volume,
    muted,
    currentTime,
    duration,
    shuffle,
    repeat,
    queue,
    currentIndex,
  } = useSelector((state: RootState) => state.player);

  // Audio element effects
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (!seeking) {
        dispatch(setCurrentTime(audio.currentTime));
      }
    };

    const handleLoadedMetadata = () => {
      dispatch(setDuration(audio.duration));
    };

    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [seeking, dispatch]);

  // Play/pause control
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {
        // Handle autoplay restrictions
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  // Volume control
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.volume = muted ? 0 : volume;
  }, [volume, muted]);

  const handlePlayPause = () => {
    dispatch(togglePlayPause());
  };

  const handleVolumeChange = (newVolume: number) => {
    dispatch(setVolume(newVolume));
  };

  const handleSeek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = time;
    dispatch(setCurrentTime(time));
  };

  const handleSeekStart = () => {
    setSeeking(true);
  };

  const handleSeekEnd = () => {
    setSeeking(false);
  };

  const handleShuffle = () => {
    dispatch(toggleShuffle());
  };

  const handleRepeat = () => {
    const modes: ('off' | 'one' | 'all')[] = ['off', 'one', 'all'];
    const currentModeIndex = modes.indexOf(repeat);
    const nextMode = modes[(currentModeIndex + 1) % modes.length];
    dispatch(setRepeat(nextMode));
  };

  const handlePrevious = () => {
    if (queue.length === 0) return;
    
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = repeat === 'all' ? queue.length - 1 : 0;
    }
    
    if (queue[prevIndex]) {
      dispatch(setCurrentTrack(queue[prevIndex]));
      dispatch(setCurrentIndex(prevIndex));
    }
  };

  const handleNext = () => {
    if (queue.length === 0) return;
    
    if (repeat === 'one') {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
      return;
    }
    
    let nextIndex;
    if (shuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else {
      nextIndex = currentIndex + 1;
      if (nextIndex >= queue.length) {
        nextIndex = repeat === 'all' ? 0 : currentIndex;
      }
    }
    
    if (queue[nextIndex] && nextIndex !== currentIndex) {
      dispatch(setCurrentTrack(queue[nextIndex]));
      dispatch(setCurrentIndex(nextIndex));
    }
  };

  const getRepeatIcon = () => {
    switch (repeat) {
      case 'one':
        return <RepeatOne />;
      case 'all':
        return <Repeat color="primary" />;
      default:
        return <Repeat />;
    }
  };

  if (!currentTrack) return null;

  return (
    <Card
      sx={{
        position: 'fixed',
        bottom: 0,
        left: { xs: 0, md: '240px' },
        right: 0,
        zIndex: 1000,
        borderRadius: 0,
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <audio
          ref={audioRef}
          preload="metadata"
          controls={false}
        >
          {currentTrack.previewMp3 && (
            <source src={currentTrack.previewMp3} type="audio/mpeg" />
          )}
          {currentTrack.previewM4a && (
            <source src={currentTrack.previewM4a} type="audio/mp4" />
          )}
          {currentTrack.previewUrl && (
            <source src={currentTrack.previewUrl} />
          )}
        </audio>
        
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* Track Info */}
          <Stack direction="row" alignItems="center" spacing={2} sx={{ minWidth: 0, flex: 1 }}>
            <Avatar
              src={currentTrack.cover}
              alt={currentTrack.title}
              sx={{ width: 56, height: 56 }}
            />
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body1" fontWeight={600} noWrap>
                {currentTrack.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {currentTrack.artist}
              </Typography>
            </Box>
          </Stack>

          {/* Controls */}
          <Stack alignItems="center" spacing={1} sx={{ flex: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton
                onClick={handleShuffle}
                color={shuffle ? 'primary' : 'default'}
                size="small"
              >
                <Shuffle />
              </IconButton>
              
              <IconButton onClick={handlePrevious} disabled={queue.length === 0}>
                <SkipPrevious />
              </IconButton>
              
              <IconButton
                onClick={handlePlayPause}
                sx={{
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
              >
                {isPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>
              
              <IconButton onClick={handleNext} disabled={queue.length === 0}>
                <SkipNext />
              </IconButton>
              
              <IconButton onClick={handleRepeat} size="small">
                {getRepeatIcon()}
              </IconButton>
            </Stack>

            {/* Progress Bar */}
            <ProgressBar
              currentTime={currentTime}
              duration={duration}
              onSeek={handleSeek}
              onSeekStart={handleSeekStart}
              onSeekEnd={handleSeekEnd}
            />
          </Stack>

          {/* Volume */}
          <VolumeControl
            volume={volume}
            muted={muted}
            onVolumeChange={handleVolumeChange}
            onToggleMute={() => dispatch(toggleMute())}
            width={80}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MusicPlayer;