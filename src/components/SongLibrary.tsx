import React, { useState, useEffect } from 'react';
import { loadSongsFromDirectory, searchSongs, getSongsByLanguage, getSongsByArtist, getFeaturedArtists } from '../utils/songLoader';
import SongItem from './SongItem';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  language: string;
  cover: string;
  previewUrl: string;
  fileName: string;
  duration?: number;
}

interface SongLibraryProps {
  onPlay: (song: Song) => void;
  onAddToPlaylist: (song: Song) => void;
  onFavorite: (song: Song) => void;
  favorites: Song[];
}

const SongLibrary: React.FC<SongLibraryProps> = ({
  onPlay,
  onAddToPlaylist,
  onFavorite,
  favorites
}) => {
  const [allSongs, setAllSongs] = useState<Song[]>([]);
  const [displayedSongs, setDisplayedSongs] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedArtist, setSelectedArtist] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [featuredArtists, setFeaturedArtists] = useState<string[]>([]);

  // Load songs on component mount
  useEffect(() => {
    setIsLoading(true);
    try {
      const songs = loadSongsFromDirectory();
      setAllSongs(songs);
      setDisplayedSongs(songs);
      setFeaturedArtists(getFeaturedArtists(songs));
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading songs:', error);
      setIsLoading(false);
    }
  }, []);

  // Filter songs based on search and filters
  useEffect(() => {
    let filtered = allSongs;

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = searchSongs(filtered, searchQuery);
    }

    // Apply language filter
    if (selectedLanguage) {
      filtered = getSongsByLanguage(filtered, selectedLanguage);
    }

    // Apply artist filter
    if (selectedArtist) {
      filtered = getSongsByArtist(filtered, selectedArtist);
    }

    setDisplayedSongs(filtered);
  }, [allSongs, searchQuery, selectedLanguage, selectedArtist]);

  const languages = Array.from(new Set(allSongs.map(song => song.language)));

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedLanguage('');
    setSelectedArtist('');
  };

  const containerStyle = {
    padding: '2rem',
    background: '#121212',
    minHeight: '100vh',
    color: '#fff'
  };

  const headerStyle = {
    textAlign: 'center' as const,
    marginBottom: '3rem'
  };

  const titleStyle = {
    color: '#1db954',
    fontSize: '3rem',
    fontWeight: 700,
    marginBottom: '1rem',
    background: 'linear-gradient(45deg, #1db954, #1ed760)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  const statsStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    marginBottom: '2rem',
    flexWrap: 'wrap' as const
  };

  const statItemStyle = {
    background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
    padding: '1rem 1.5rem',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    border: '1px solid #333'
  };

  const filtersStyle = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '2rem',
    flexWrap: 'wrap' as const,
    justifyContent: 'center',
    alignItems: 'center'
  };

  const inputStyle = {
    background: '#282828',
    color: '#fff',
    border: '2px solid #1db954',
    borderRadius: '25px',
    padding: '0.8rem 1.2rem',
    fontSize: '1rem',
    outline: 'none',
    minWidth: '300px'
  };

  const selectStyle = {
    background: '#282828',
    color: '#fff',
    border: '2px solid #1db954',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    fontSize: '0.9rem',
    outline: 'none'
  };

  const buttonStyle = {
    background: '#ff6b35',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.5rem 1.5rem',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer'
  };

  if (isLoading) {
    return (
      <div style={containerStyle}>
        <div style={{ 
          textAlign: 'center', 
          padding: '4rem',
          fontSize: '1.2rem',
          color: '#1db954'
        }}>
          <LibraryMusicOutlinedIcon style={{ fontSize: '4rem', marginBottom: '1rem' }} />
          <div>Loading your music library...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Your Music Library</h1>
        
        <div style={statsStyle}>
          <div style={statItemStyle}>
            <LibraryMusicOutlinedIcon style={{ color: '#1db954' }} />
            <span>{allSongs.length} Songs</span>
          </div>
          <div style={statItemStyle}>
            <PersonOutlineOutlinedIcon style={{ color: '#1db954' }} />
            <span>{featuredArtists.length} Artists</span>
          </div>
          <div style={statItemStyle}>
            <LanguageOutlinedIcon style={{ color: '#1db954' }} />
            <span>{languages.length} Languages</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div style={filtersStyle}>
        <div style={{ position: 'relative' }}>
          <SearchOutlinedIcon 
            style={{ 
              position: 'absolute', 
              left: '1rem', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: '#1db954'
            }} 
          />
          <input
            type="text"
            placeholder="Search songs, artists, or albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ ...inputStyle, paddingLeft: '3rem' }}
          />
        </div>

        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          style={selectStyle}
        >
          <option value="">All Languages</option>
          {languages.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>

        <select
          value={selectedArtist}
          onChange={(e) => setSelectedArtist(e.target.value)}
          style={selectStyle}
        >
          <option value="">All Artists</option>
          {featuredArtists.map(artist => (
            <option key={artist} value={artist}>{artist}</option>
          ))}
        </select>

        {(searchQuery || selectedLanguage || selectedArtist) && (
          <button onClick={handleClearFilters} style={buttonStyle}>
            Clear Filters
          </button>
        )}
      </div>

      {/* Results */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ 
          color: '#b3b3b3', 
          marginBottom: '1rem',
          textAlign: 'center',
          fontSize: '1.1rem'
        }}>
          Showing {displayedSongs.length} of {allSongs.length} songs
        </div>

        {displayedSongs.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem',
            color: '#b3b3b3',
            fontSize: '1.2rem'
          }}>
            <SearchOutlinedIcon style={{ fontSize: '3rem', marginBottom: '1rem' }} />
            <div>No songs found matching your criteria</div>
            <div style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
              Try adjusting your search or filters
            </div>
          </div>
        ) : (
          <div>
            {displayedSongs.map((song) => (
              <SongItem
                key={song.id}
                track={song}
                onPlay={onPlay}
                onAddToPlaylist={onAddToPlaylist}
                onFavorite={onFavorite}
                isFavorite={!!favorites.find(f => f.id === song.id)}
                showDownload={true}
              />
            ))}
          </div>
        )}
      </div>

      {/* Featured Artists Section */}
      {featuredArtists.length > 0 && (
        <div style={{
          marginTop: '3rem',
          background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid #333'
        }}>
          <h2 style={{ 
            color: '#1db954', 
            fontSize: '1.8rem', 
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            Featured Artists
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center'
          }}>
            {featuredArtists.map((artist) => (
              <button
                key={artist}
                onClick={() => setSelectedArtist(artist)}
                style={{
                  background: selectedArtist === artist ? '#1db954' : '#282828',
                  color: '#fff',
                  border: '1px solid #1db954',
                  borderRadius: '25px',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (selectedArtist !== artist) {
                    e.currentTarget.style.background = '#333';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedArtist !== artist) {
                    e.currentTarget.style.background = '#282828';
                  }
                }}
              >
                {artist}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SongLibrary;