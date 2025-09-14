import { useState, useEffect, useRef } from 'react';

interface Track {
  id: number;
  title: string;
  artist: string;
  previewUrl?: string;
}

interface UseAudioPlayerProps {
  track: Track | null;
  playlist: Track[];
  onTrackChange: (track: Track) => void;
}

export const useAudioPlayer = ({ track, playlist, onTrackChange }: UseAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState('');
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<'off' | 'one' | 'all'>('off');
  const [isLoading, setIsLoading] = useState(false);

  const isFiniteNumber = (n: number) => Number.isFinite(n) && !Number.isNaN(n);
  
  const formatTime = (s: number) => {
    if (!isFiniteNumber(s)) return '00:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  // Sync play/pause and volume
  useEffect(() => {
    const el = audioRef.current;
    if (!el || !track) return;
    
    el.volume = muted ? 0 : volume;
    
    if (isPlaying) {
      setIsLoading(true);
      const playPromise = el.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise
          .then(() => setIsLoading(false))
          .catch(() => {
            setIsPlaying(false);
            setIsLoading(false);
            setError('Failed to play audio. This might be due to browser autoplay restrictions.');
          });
      }
    } else {
      el.pause();
      setIsLoading(false);
    }
  }, [isPlaying, volume, muted, track]);

  // Reset on track change
  useEffect(() => {
    if (track) {
      setError('');
      setCurrentTime(0);
      setIsPlaying(true);
      setIsLoading(true);
    }
  }, [track?.id]);

  const handlePlayPause = () => {
    if (!track) return;
    setIsPlaying(prev => !prev);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (newVolume > 0 && muted) {
      setMuted(false);
    }
  };

  const handleMute = () => setMuted(prev => !prev);

  const handleTimeUpdate = () => {
    const el = audioRef.current;
    if (!el) return;
    setCurrentTime(el.currentTime || 0);
    setDuration(isFiniteNumber(el.duration) ? el.duration : 0);
    setIsLoading(false);
  };

  const handleSeek = (newTime: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const getNextTrackIndex = () => {
    if (!playlist.length || !track) return -1;
    const currentIndex = playlist.findIndex(t => t.id === track.id);
    
    if (shuffle) {
      if (playlist.length === 1) return currentIndex;
      let randomIndex = currentIndex;
      while (randomIndex === currentIndex) {
        randomIndex = Math.floor(Math.random() * playlist.length);
      }
      return randomIndex;
    }
    
    if (currentIndex < playlist.length - 1) return currentIndex + 1;
    if (repeat === 'all') return 0;
    return -1;
  };

  const getPrevTrackIndex = () => {
    if (!playlist.length || !track) return -1;
    const currentIndex = playlist.findIndex(t => t.id === track.id);
    
    if (shuffle) {
      if (playlist.length === 1) return currentIndex;
      let randomIndex = currentIndex;
      while (randomIndex === currentIndex) {
        randomIndex = Math.floor(Math.random() * playlist.length);
      }
      return randomIndex;
    }
    
    if (currentIndex > 0) return currentIndex - 1;
    if (repeat === 'all') return playlist.length - 1;
    return -1;
  };

  const handleNext = () => {
    if (repeat === 'one') {
      const el = audioRef.current;
      if (el) {
        el.currentTime = 0;
        setCurrentTime(0);
        if (isPlaying) el.play();
      }
      return;
    }
    
    const nextIndex = getNextTrackIndex();
    if (nextIndex >= 0) {
      onTrackChange(playlist[nextIndex]);
    }
  };

  const handlePrev = () => {
    const prevIndex = getPrevTrackIndex();
    if (prevIndex >= 0) {
      onTrackChange(playlist[prevIndex]);
    }
  };

  const skip = (seconds: number) => {
    const el = audioRef.current;
    if (!el) return;
    const newTime = Math.max(0, Math.min(duration, (el.currentTime || 0) + seconds));
    el.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleError = () => {
    setError('Failed to load audio. The file might be corrupted or unavailable.');
    setIsPlaying(false);
    setIsLoading(false);
  };

  const handleEnded = () => {
    if (repeat === 'one') {
      const el = audioRef.current;
      if (el) {
        el.currentTime = 0;
        el.play();
      }
    } else {
      handleNext();
    }
  };

  const cycleRepeat = () => {
    setRepeat(current => {
      switch (current) {
        case 'off': return 'one';
        case 'one': return 'all';
        case 'all': return 'off';
        default: return 'off';
      }
    });
  };

  return {
    audioRef,
    isPlaying,
    volume,
    muted,
    currentTime,
    duration,
    error,
    shuffle,
    repeat,
    isLoading,
    formatTime,
    handlePlayPause,
    handleVolumeChange,
    handleMute,
    handleTimeUpdate,
    handleSeek,
    handleNext,
    handlePrev,
    skip,
    handleError,
    handleEnded,
    cycleRepeat,
    setShuffle
  };
};