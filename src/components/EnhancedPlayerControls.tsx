import React from 'react';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import SkipNextOutlinedIcon from '@mui/icons-material/SkipNextOutlined';
import SkipPreviousOutlinedIcon from '@mui/icons-material/SkipPreviousOutlined';
import ShuffleOutlinedIcon from '@mui/icons-material/ShuffleOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import RepeatOneOutlinedIcon from '@mui/icons-material/RepeatOneOutlined';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import VolumeOffOutlinedIcon from '@mui/icons-material/VolumeOffOutlined';
import FastRewindOutlinedIcon from '@mui/icons-material/FastRewindOutlined';
import FastForwardOutlinedIcon from '@mui/icons-material/FastForwardOutlined';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

interface Track {
  id: number;
  title: string;
  artist: string;
  previewUrl?: string;
}

interface EnhancedPlayerControlsProps {
  track: Track;
  playlist: Track[];
  onTrackChange: (track: Track) => void;
}

const EnhancedPlayerControls: React.FC<EnhancedPlayerControlsProps> = ({
  track,
  playlist,
  onTrackChange
}) => {
  const {
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
  } = useAudioPlayer({ track, playlist, onTrackChange });

  const buttonStyle = {
    background: '#282828',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '40px',
    height: '40px'
  };

  const activeButtonStyle = {
    ...buttonStyle,
    background: '#1db954'
  };

  const playButtonStyle = {
    ...buttonStyle,
    background: '#1db954',
    borderRadius: '50%',
    width: '50px',
    height: '50px'
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <audio
        ref={audioRef}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={handleEnded}
        onError={handleError}
        onCanPlay={() => setIsLoading && setIsLoading(false)}
        style={{ display: 'none' }}
      >
        {track?.previewUrl && <source src={track.previewUrl} />}
      </audio>

      {error && (
        <div style={{ 
          color: '#ff4d4f', 
          marginBottom: '1rem', 
          padding: '0.5rem', 
          background: 'rgba(255, 77, 79, 0.1)', 
          borderRadius: '6px',
          fontSize: '0.9rem'
        }}>
          {error}
        </div>
      )}

      {isLoading && (
        <div style={{ 
          color: '#1db954', 
          marginBottom: '1rem', 
          textAlign: 'center',
          fontSize: '0.9rem'
        }}>
          Loading audio...
        </div>
      )}

      {/* Main Controls */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.8rem', 
        marginBottom: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setShuffle(!shuffle)}
          style={shuffle ? activeButtonStyle : buttonStyle}
          title={shuffle ? 'Shuffle: On' : 'Shuffle: Off'}
        >
          <ShuffleOutlinedIcon style={{ fontSize: '1.2rem' }} />
        </button>

        <button
          onClick={handlePrev}
          style={buttonStyle}
          title="Previous track"
        >
          <SkipPreviousOutlinedIcon style={{ fontSize: '1.4rem' }} />
        </button>

        <button
          onClick={() => skip(-10)}
          style={buttonStyle}
          title="Rewind 10 seconds"
        >
          <FastRewindOutlinedIcon style={{ fontSize: '1.2rem' }} />
        </button>

        <button
          onClick={handlePlayPause}
          style={playButtonStyle}
          title={isPlaying ? 'Pause' : 'Play'}
          disabled={isLoading}
        >
          {isPlaying ? (
            <PauseOutlinedIcon style={{ fontSize: '1.8rem' }} />
          ) : (
            <PlayArrowOutlinedIcon style={{ fontSize: '1.8rem' }} />
          )}
        </button>

        <button
          onClick={() => skip(10)}
          style={buttonStyle}
          title="Forward 10 seconds"
        >
          <FastForwardOutlinedIcon style={{ fontSize: '1.2rem' }} />
        </button>

        <button
          onClick={handleNext}
          style={buttonStyle}
          title="Next track"
        >
          <SkipNextOutlinedIcon style={{ fontSize: '1.4rem' }} />
        </button>

        <button
          onClick={cycleRepeat}
          style={repeat !== 'off' ? activeButtonStyle : buttonStyle}
          title={`Repeat: ${repeat}`}
        >
          {repeat === 'one' ? (
            <RepeatOneOutlinedIcon style={{ fontSize: '1.2rem' }} />
          ) : (
            <RepeatOutlinedIcon style={{ fontSize: '1.2rem' }} />
          )}
        </button>
      </div>

      {/* Progress Bar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem', 
        marginBottom: '1rem' 
      }}>
        <span style={{ 
          color: '#b3b3b3', 
          minWidth: '45px', 
          textAlign: 'right',
          fontSize: '0.9rem'
        }}>
          {formatTime(currentTime)}
        </span>
        
        <div style={{ flex: 1, position: 'relative' }}>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={(e) => handleSeek(Number(e.target.value))}
            style={{
              width: '100%',
              height: '6px',
              borderRadius: '3px',
              background: '#404040',
              outline: 'none',
              cursor: 'pointer'
            }}
          />
        </div>
        
        <span style={{ 
          color: '#b3b3b3', 
          minWidth: '45px',
          fontSize: '0.9rem'
        }}>
          {formatTime(duration)}
        </span>
      </div>

      {/* Volume Control */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1rem',
        justifyContent: 'center'
      }}>
        <button
          onClick={handleMute}
          style={buttonStyle}
          title={muted ? 'Unmute' : 'Mute'}
        >
          {muted || volume === 0 ? (
            <VolumeOffOutlinedIcon style={{ fontSize: '1.2rem' }} />
          ) : (
            <VolumeUpOutlinedIcon style={{ fontSize: '1.2rem' }} />
          )}
        </button>
        
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : volume}
          onChange={(e) => handleVolumeChange(Number(e.target.value))}
          style={{
            width: '120px',
            height: '4px',
            borderRadius: '2px',
            background: '#404040',
            outline: 'none',
            cursor: 'pointer'
          }}
        />
        
        <span style={{ 
          color: '#b3b3b3', 
          minWidth: '35px',
          fontSize: '0.9rem'
        }}>
          {Math.round((muted ? 0 : volume) * 100)}%
        </span>
      </div>
    </div>
  );
};

export default EnhancedPlayerControls;