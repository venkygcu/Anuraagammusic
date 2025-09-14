import React from 'react';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import DownloadButton from './DownloadButton';

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  language?: string;
  cover: string;
  previewUrl?: string;
}

interface SongItemProps {
  track: Track;
  onPlay: (track: Track) => void;
  onAddToPlaylist?: (track: Track) => void;
  onFavorite?: (track: Track) => void;
  isFavorite?: boolean;
  showDownload?: boolean;
  compact?: boolean;
}

const SongItem: React.FC<SongItemProps> = ({
  track,
  onPlay,
  onAddToPlaylist,
  onFavorite,
  isFavorite = false,
  showDownload = true,
  compact = false
}) => {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    background: '#282828',
    borderRadius: '8px',
    padding: compact ? '0.5rem 0.8rem' : '0.7rem 1rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease',
    cursor: 'pointer'
  };

  const imageStyle = {
    width: compact ? '40px' : '50px',
    height: compact ? '40px' : '50px',
    borderRadius: '6px',
    marginRight: '1rem',
    objectFit: 'cover' as const
  };

  const buttonStyle = {
    background: '#1db954',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.3rem 0.8rem',
    marginRight: '0.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    fontSize: '0.9rem'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    background: '#40a9ff'
  };

  const favoriteButtonStyle = {
    ...buttonStyle,
    background: isFavorite ? '#ffd700' : '#888'
  };

  return (
    <div 
      style={containerStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = '#333333';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#282828';
      }}
    >
      <img 
        src={track.cover} 
        alt={`${track.title} cover`} 
        style={imageStyle}
        onError={(e) => {
          e.currentTarget.src = 'https://via.placeholder.com/50x50/282828/ffffff?text=♪';
        }}
      />
      
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ 
          color: '#fff', 
          fontWeight: 600, 
          fontSize: compact ? '0.9rem' : '1rem',
          marginBottom: '0.2rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {track.title}
        </div>
        <div style={{ 
          color: '#b3b3b3', 
          fontSize: compact ? '0.8rem' : '0.9rem',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {track.artist}
          {track.album && (
            <>
              <span style={{ margin: '0 0.3rem' }}>•</span>
              <span style={{ fontStyle: 'italic' }}>{track.album}</span>
            </>
          )}
          {track.language && (
            <>
              <span style={{ margin: '0 0.3rem' }}>•</span>
              <span>{track.language}</span>
            </>
          )}
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.5rem',
        flexShrink: 0
      }}>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onPlay(track);
          }}
          style={buttonStyle}
          title="Play song"
        >
          <PlayArrowOutlinedIcon style={{ fontSize: '1rem' }} />
          Play
        </button>

        {onAddToPlaylist && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToPlaylist(track);
            }}
            style={secondaryButtonStyle}
            title="Add to playlist"
          >
            <PlaylistAddOutlinedIcon style={{ fontSize: '1rem' }} />
            {compact ? '' : 'Playlist'}
          </button>
        )}

        {onFavorite && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onFavorite(track);
            }}
            style={favoriteButtonStyle}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <FavoriteOutlinedIcon style={{ fontSize: '1rem' }} />
            ) : (
              <FavoriteBorderOutlinedIcon style={{ fontSize: '1rem' }} />
            )}
            {compact ? '' : (isFavorite ? 'Favorited' : 'Favorite')}
          </button>
        )}

        {showDownload && (
          <DownloadButton 
            track={track}
            onDownloadStart={(id) => console.log(`Download started for track ${id}`)}
            onDownloadComplete={(id) => console.log(`Download completed for track ${id}`)}
          />
        )}
      </div>
    </div>
  );
};

export default SongItem;