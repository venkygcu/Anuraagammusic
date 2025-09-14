import React, { useState, useEffect } from 'react';
import './index.css';

// Mock data for preview
const mockSongs = [
  {
    id: 1,
    title: "Ala Vaikunthapurramuloo",
    artist: "Armaan Malik",
    album: "Ala Vaikunthapurramuloo",
    language: "Telugu",
    cover: "https://i.pravatar.cc/150?img=1",
    previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
  },
  {
    id: 2,
    title: "Buttabomma",
    artist: "Armaan Malik",
    album: "Ala Vaikunthapurramuloo", 
    language: "Telugu",
    cover: "https://i.pravatar.cc/150?img=2",
    previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
  },
  {
    id: 3,
    title: "Ramuloo Ramulaa",
    artist: "Anurag Kulkarni",
    album: "Ala Vaikunthapurramuloo",
    language: "Telugu", 
    cover: "https://i.pravatar.cc/150?img=3",
    previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
  },
  {
    id: 4,
    title: "Samajavaragamana",
    artist: "Sid Sriram",
    album: "Ala Vaikunthapurramuloo",
    language: "Telugu",
    cover: "https://i.pravatar.cc/150?img=4", 
    previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
  },
  {
    id: 5,
    title: "Butta Bomma",
    artist: "Armaan Malik",
    album: "Ala Vaikunthapurramuloo",
    language: "Telugu",
    cover: "https://i.pravatar.cc/150?img=5",
    previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
  }
];

// Searchbar Component
const Searchbar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
      <input
        type="text"
        placeholder="Search for songs or artists..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ 
          padding: '0.5rem 1rem', 
          borderRadius: '8px', 
          border: '1px solid #1db954', 
          width: '60%',
          background: '#282828',
          color: '#fff'
        }}
      />
      <button type="submit" style={{ 
        padding: '0.5rem 1.5rem', 
        borderRadius: '8px', 
        background: '#1db954', 
        color: '#fff', 
        border: 'none', 
        fontWeight: 600 
      }}>
        Search
      </button>
    </form>
  );
};

// FilterBar Component
const FilterBar = ({ allSongs, onFilter }: { allSongs: any[], onFilter: (filters: any) => void }) => {
  const languages = Array.from(new Set(allSongs.map(s => s.language)));
  const artists = Array.from(new Set(allSongs.map(s => s.artist)));
  const albums = Array.from(new Set(allSongs.map(s => s.album)));

  const [language, setLanguage] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');

  const handleFilter = () => {
    onFilter({ language, artist, album });
  };

  const selectStyle = {
    background: '#282828',
    color: '#fff',
    border: '1px solid #1db954',
    borderRadius: '6px',
    padding: '0.3rem 0.8rem'
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
      <select value={language} onChange={e => setLanguage(e.target.value)} style={selectStyle}>
        <option value="">All Languages</option>
        {languages.map(l => <option key={l} value={l}>{l}</option>)}
      </select>
      <select value={artist} onChange={e => setArtist(e.target.value)} style={selectStyle}>
        <option value="">All Artists</option>
        {artists.map(a => <option key={a} value={a}>{a}</option>)}
      </select>
      <select value={album} onChange={e => setAlbum(e.target.value)} style={selectStyle}>
        <option value="">All Albums</option>
        {albums.map(a => <option key={a} value={a}>{a}</option>)}
      </select>
      <button onClick={handleFilter} style={{ 
        background: '#1db954', 
        color: '#fff', 
        border: 'none', 
        borderRadius: '6px', 
        padding: '0.3rem 1rem' 
      }}>
        Filter
      </button>
    </div>
  );
};

// Results Component
const Results = ({ results, onPlay, onAddToPlaylist, onFavorite, favorites }: any) => {
  if (!results.length) return <div style={{ color: '#b3b3b3' }}>No results found.</div>;
  
  return (
    <div style={{ marginTop: '2rem' }}>
      {results.map((track: any) => {
        const isFav = favorites && favorites.find((t: any) => t.id === track.id);
        return (
          <div key={track.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: '#282828', 
            borderRadius: '8px', 
            padding: '0.7rem 1rem', 
            marginBottom: '1rem', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)' 
          }}>
            <img src={track.cover} alt="cover" style={{ 
              width: '50px', 
              height: '50px', 
              borderRadius: '6px', 
              marginRight: '1rem' 
            }} />
            <div style={{ flex: 1 }}>
              <span style={{ color: '#fff', fontWeight: 600 }}>{track.title}</span>
              <span style={{ color: '#b3b3b3', marginLeft: '0.5rem' }}>{track.artist}</span>
              <span style={{ color: '#b3b3b3', marginLeft: '0.5rem', fontStyle: 'italic' }}>{track.album}</span>
            </div>
            <button onClick={() => onPlay(track)} style={{ 
              marginRight: '0.5rem', 
              background: '#1db954', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '6px', 
              padding: '0.3rem 1rem' 
            }}>
              Play
            </button>
            <button onClick={() => onAddToPlaylist(track)} style={{ 
              marginRight: '0.5rem', 
              background: '#40a9ff', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '6px', 
              padding: '0.3rem 1rem' 
            }}>
              Add to Playlist
            </button>
            <button onClick={() => onFavorite(track)} style={{ 
              background: isFav ? '#ffd700' : '#888', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '6px', 
              padding: '0.3rem 1rem' 
            }}>
              {isFav ? 'Favorited' : 'Favorite'}
            </button>
          </div>
        );
      })}
    </div>
  );
};

// Auth Component
const Auth = ({ onAuth }: { onAuth: (user: string) => void }) => {
  const [mode, setMode] = useState('email');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    setOtpSent(true);
    setError('');
  };

  const handleVerifyOtp = async () => {
    if (otp === '123456') {
      onAuth(mode === 'email' ? email : mobile);
    } else {
      setError('Invalid OTP');
    }
  };

  return (
    <div style={{
      background: '#181818',
      color: '#fff',
      padding: '2rem',
      borderRadius: '12px',
      maxWidth: '350px',
      margin: '4rem auto',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      textAlign: 'center'
    }}>
      <h2>Login</h2>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1rem' }}>
        <button onClick={() => setMode('email')} style={{ 
          background: mode === 'email' ? '#1db954' : '#282828', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '6px', 
          padding: '0.3rem 1rem' 
        }}>
          Email
        </button>
        <button onClick={() => setMode('mobile')} style={{ 
          background: mode === 'mobile' ? '#1db954' : '#282828', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '6px', 
          padding: '0.3rem 1rem' 
        }}>
          Mobile
        </button>
      </div>
      {mode === 'email' && (
        <div>
          {!otpSent ? (
            <>
              <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
                style={{
                  display: 'block',
                  width: '90%',
                  margin: '1rem auto',
                  padding: '0.7rem',
                  borderRadius: '8px',
                  border: '1px solid #1db954',
                  background: '#282828',
                  color: '#fff'
                }}
              />
              <button type="button" onClick={handleSendOtp} style={{
                background: '#1db954',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.7rem 2rem',
                fontWeight: 600,
                marginTop: '1rem',
                cursor: 'pointer'
              }}>
                Send OTP
              </button>
            </>
          ) : (
            <>
              <input 
                type="text" 
                placeholder="Enter OTP (demo: 123456)" 
                value={otp} 
                onChange={e => setOtp(e.target.value)} 
                required 
                style={{
                  display: 'block',
                  width: '90%',
                  margin: '1rem auto',
                  padding: '0.7rem',
                  borderRadius: '8px',
                  border: '1px solid #1db954',
                  background: '#282828',
                  color: '#fff'
                }}
              />
              <button type="button" onClick={handleVerifyOtp} style={{
                background: '#1db954',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.7rem 2rem',
                fontWeight: 600,
                marginTop: '1rem',
                cursor: 'pointer'
              }}>
                Verify OTP
              </button>
            </>
          )}
        </div>
      )}
      {mode === 'mobile' && (
        <div>
          {!otpSent ? (
            <>
              <input 
                type="tel" 
                placeholder="Mobile Number" 
                value={mobile} 
                onChange={e => setMobile(e.target.value)} 
                required 
                style={{
                  display: 'block',
                  width: '90%',
                  margin: '1rem auto',
                  padding: '0.7rem',
                  borderRadius: '8px',
                  border: '1px solid #1db954',
                  background: '#282828',
                  color: '#fff'
                }}
              />
              <button type="button" onClick={handleSendOtp} style={{
                background: '#1db954',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.7rem 2rem',
                fontWeight: 600,
                marginTop: '1rem',
                cursor: 'pointer'
              }}>
                Send OTP
              </button>
            </>
          ) : (
            <>
              <input 
                type="text" 
                placeholder="Enter OTP (demo: 123456)" 
                value={otp} 
                onChange={e => setOtp(e.target.value)} 
                required 
                style={{
                  display: 'block',
                  width: '90%',
                  margin: '1rem auto',
                  padding: '0.7rem',
                  borderRadius: '8px',
                  border: '1px solid #1db954',
                  background: '#282828',
                  color: '#fff'
                }}
              />
              <button type="button" onClick={handleVerifyOtp} style={{
                background: '#1db954',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '0.7rem 2rem',
                fontWeight: 600,
                marginTop: '1rem',
                cursor: 'pointer'
              }}>
                Verify OTP
              </button>
            </>
          )}
        </div>
      )}
      <p style={{ color: 'red' }}>{error}</p>
    </div>
  );
};

// Player Controls Component
const PlayerControls = ({ playing, playlist, setPlaying }: any) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState('');
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState('off');

  const idx = playlist.findIndex((t: any) => t.id === playing.id);

  const isFiniteNumber = (n: number) => Number.isFinite(n) && !Number.isNaN(n);
  const formatTime = (s: number) => {
    if (!isFiniteNumber(s)) return '00:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = muted ? 0 : volume;
    const playPromise = isPlaying ? el.play() : el.pause();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        setIsPlaying(false);
      });
    }
  }, [isPlaying, volume, muted, playing]);

  useEffect(() => {
    setError('');
    setCurrentTime(0);
    setIsPlaying(true);
  }, [playing?.id]);

  const handlePlayPause = () => setIsPlaying(p => !p);
  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => setVolume(Number(e.target.value));
  const handleMute = () => setMuted(m => !m);

  const handleTimeUpdate = () => {
    const el = audioRef.current;
    if (!el) return;
    setCurrentTime(el.currentTime || 0);
    setDuration(isFiniteNumber(el.duration) ? el.duration : 0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = audioRef.current;
    if (!el) return;
    const val = Number(e.target.value);
    el.currentTime = val;
    setCurrentTime(val);
  };

  const handleNext = () => {
    if (repeat === 'one') {
      const el = audioRef.current;
      if (el) { 
        el.currentTime = 0; 
        el.play(); 
      }
      return;
    }
    const nextIdx = idx < playlist.length - 1 ? idx + 1 : 0;
    if (nextIdx >= 0) setPlaying(playlist[nextIdx]);
  };

  const handlePrev = () => {
    const prevIdx = idx > 0 ? idx - 1 : playlist.length - 1;
    if (prevIdx >= 0) setPlaying(playlist[prevIdx]);
  };

  const skip = (secs: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = Math.max(0, (el.currentTime || 0) + secs);
    setCurrentTime(el.currentTime);
  };

  const handleError = () => {
    setError('Failed to play this song. This is a demo with mock audio.');
  };

  const cycleRepeat = () => {
    setRepeat(r => (r === 'off' ? 'one' : r === 'one' ? 'all' : 'off'));
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <audio
        key={playing?.id}
        ref={audioRef}
        autoPlay
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={handleNext}
        onError={handleError}
        style={{ width: '100%' }}
      >
        {playing?.previewUrl && <source src={playing.previewUrl} />}
      </audio>
      {error && <div style={{ color: 'red', marginTop: '0.5rem' }}>{error}</div>}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <button 
          title={shuffle ? 'Shuffle: On' : 'Shuffle: Off'} 
          onClick={() => setShuffle(s => !s)} 
          style={{ 
            background: shuffle ? '#1db954' : '#282828', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '6px', 
            padding: '0.3rem 0.8rem' 
          }}
        >
          🔀
        </button>
        <button 
          onClick={handlePrev} 
          style={{ 
            background: '#282828', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '6px', 
            padding: '0.3rem 0.8rem' 
          }}
        >
          ⏮
        </button>
        <button 
          onClick={() => skip(-10)} 
          style={{ 
            background: '#282828', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '6px', 
            padding: '0.3rem 0.8rem' 
          }}
        >
          ⏪ 10
        </button>
        <button 
          onClick={handlePlayPause} 
          style={{ 
            background: '#1db954', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '50%', 
            width: '44px', 
            height: '44px', 
            fontSize: '1.2rem' 
          }}
        >
          {isPlaying ? '⏸' : '▶️'}
        </button>
        <button 
          onClick={() => skip(10)} 
          style={{ 
            background: '#282828', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '6px', 
            padding: '0.3rem 0.8rem' 
          }}
        >
          10 ⏩
        </button>
        <button 
          onClick={handleNext} 
          style={{ 
            background: '#282828', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '6px', 
            padding: '0.3rem 0.8rem' 
          }}
        >
          ⏭
        </button>
        <button 
          title={`Repeat: ${repeat}`} 
          onClick={cycleRepeat} 
          style={{ 
            background: repeat !== 'off' ? '#1db954' : '#282828', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '6px', 
            padding: '0.3rem 0.8rem' 
          }}
        >
          {repeat === 'one' ? '🔂' : '🔁'}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: '220px' }}>
          <span style={{ color: '#b3b3b3', minWidth: '48px', textAlign: 'right' }}>{formatTime(currentTime)}</span>
          <input 
            type="range" 
            min={0} 
            max={isFiniteNumber(duration) && duration > 0 ? duration : 0} 
            value={isFiniteNumber(currentTime) ? currentTime : 0} 
            onChange={handleSeek} 
            style={{ flex: 1 }} 
          />
          <span style={{ color: '#b3b3b3', minWidth: '48px' }}>{formatTime(duration)}</span>
        </div>
        <button 
          title={muted ? 'Unmute' : 'Mute'} 
          onClick={handleMute} 
          style={{ 
            background: '#282828', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '6px', 
            padding: '0.3rem 0.8rem' 
          }}
        >
          {muted || volume === 0 ? '🔈' : '🔊'}
        </button>
        <input 
          type="range" 
          min={0} 
          max={1} 
          step={0.01} 
          value={muted ? 0 : volume} 
          onChange={handleVolume} 
          style={{ width: '100px' }} 
        />
      </div>
    </div>
  );
};

// Songs Page Component
const Songs = ({ onPlay }: { onPlay: (song: any) => void }) => {
  const [songs, setSongs] = useState(mockSongs);
  const [search, setSearch] = useState('');

  const filtered = songs.filter(song =>
    song.title.toLowerCase().includes(search.toLowerCase()) ||
    song.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '2rem', background: '#121212', minHeight: '100vh', color: '#fff' }}>
      <h1>All Songs</h1>
      <input
        type="text"
        placeholder="Search songs or artists..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '0.5rem',
          marginBottom: '2rem',
          borderRadius: '8px',
          border: 'none',
          fontSize: '1rem',
          background: '#282828',
          color: '#fff'
        }}
      />
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '2rem'
      }}>
        {filtered.length === 0 ? (
          <div style={{ color: '#b3b3b3', fontSize: '1.2rem', gridColumn: '1/-1', textAlign: 'center' }}>
            No songs found.
          </div>
        ) : (
          filtered.map(song => (
            <div key={song.id} style={{
              background: '#181818',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <img src={song.cover} alt="cover" style={{
                width: '120px',
                height: '120px',
                borderRadius: '8px',
                objectFit: 'cover',
                marginBottom: '1rem'
              }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  {song.title}
                </div>
                <div style={{ color: '#b3b3b3', marginBottom: '1rem' }}>
                  {song.artist}
                </div>
                <button onClick={() => onPlay(song)} style={{
                  background: '#1db954',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.5rem 1.5rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}>
                  Play
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [results, setResults] = useState<any[]>([]);
  const [playing, setPlaying] = useState<any>(null);
  const [playlist, setPlaylist] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('playlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [favorites, setFavorites] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [allSongs, setAllSongs] = useState(mockSongs);
  const [user, setUser] = useState<string | null>(null);
  const [showSongsPage, setShowSongsPage] = useState(false);

  const handleSearch = async (query: string) => {
    const filtered = mockSongs.filter(song => 
      song.title.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase()) ||
      song.album.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  const handleFilter = ({ language, artist, album }: any) => {
    let filtered = allSongs;
    if (language) filtered = filtered.filter(s => s.language === language);
    if (artist) filtered = filtered.filter(s => s.artist === artist);
    if (album) filtered = filtered.filter(s => s.album === album);
    setResults(filtered);
  };

  const handlePlay = (track: any) => {
    setPlaying(track);
    setTimeout(() => {
      const player = document.querySelector('.player');
      if (player) player.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAddToPlaylist = (track: any) => {
    if (!playlist.find(t => t.id === track.id)) {
      const updated = [...playlist, track];
      setPlaylist(updated);
      localStorage.setItem('playlist', JSON.stringify(updated));
    }
  };

  const handleRemoveFromPlaylist = (trackId: number) => {
    const updated = playlist.filter(t => t.id !== trackId);
    setPlaylist(updated);
    localStorage.setItem('playlist', JSON.stringify(updated));
  };

  const handleFavorite = (track: any) => {
    if (!favorites.find(t => t.id === track.id)) {
      const updated = [...favorites, track];
      setFavorites(updated);
      localStorage.setItem('favorites', JSON.stringify(updated));
    }
  };

  const handleUnfavorite = (trackId: number) => {
    const updated = favorites.filter(t => t.id !== trackId);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  if (!user) {
    return <Auth onAuth={setUser} />;
  }

  const activeList = playlist.length ? playlist : (results.length ? results : allSongs);

  const sidebarStyle = {
    background: '#181818',
    color: '#fff',
    width: '220px',
    height: '100vh',
    position: 'fixed' as const,
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    paddingTop: '2rem',
    boxShadow: '2px 0 8px rgba(0,0,0,0.2)',
  };

  const mainStyle = {
    marginLeft: '220px',
    background: '#121212',
    minHeight: '100vh',
    color: '#fff',
    padding: '2rem',
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#121212' }}>
      <header style={{ background: '#181818', color: '#fff', padding: '1rem 2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontWeight: 700, fontSize: '2rem', color: '#1db954', margin: 0 }}>Anuraagam Music App</h1>
      </header>
      <main style={{ flex: 1, display: 'flex' }}>
        <div style={sidebarStyle}>
          <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '2rem', color: '#1db954' }}>Menu</h2>
          <nav style={{ width: '100%' }}>
            <ul style={{ listStyle: 'none', padding: 0, width: '100%' }}>
              <li style={{ margin: '1rem 0', fontWeight: 600, cursor: 'pointer', padding: '0.5rem 1rem' }} onClick={() => setShowSongsPage(false)}>Home</li>
              <li style={{ margin: '1rem 0', fontWeight: 600, cursor: 'pointer', padding: '0.5rem 1rem' }} onClick={() => setShowSongsPage(true)}>Songs</li>
              <li style={{ margin: '1rem 0', fontWeight: 600, padding: '0.5rem 1rem' }}>Your Playlist</li>
              <li style={{ margin: '1rem 0', fontWeight: 600, color: '#b3b3b3', padding: '0.5rem 1rem' }}>Welcome, {user}</li>
            </ul>
          </nav>
        </div>
        <div style={mainStyle}>
          {showSongsPage ? (
            <Songs onPlay={handlePlay} />
          ) : (
            <>
              <h1 style={{ color: '#1db954', fontWeight: 700, fontSize: '2.5rem', marginBottom: '1rem' }}>All Songs</h1>
              <Searchbar onSearch={handleSearch} />
              <FilterBar allSongs={allSongs} onFilter={handleFilter} />
              <Results 
                results={results.length ? results : allSongs} 
                onPlay={handlePlay} 
                onAddToPlaylist={handleAddToPlaylist} 
                onFavorite={handleFavorite} 
                favorites={favorites} 
              />
              {playing && (
                <div className="player" style={{ 
                  background: '#282828', 
                  borderRadius: '12px', 
                  padding: '1rem', 
                  marginTop: '2rem', 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={playing.cover} alt="cover" style={{ width: '80px', height: '80px', borderRadius: '8px' }} />
                    <div>
                      <h2 style={{ color: '#fff', margin: 0 }}>{playing.title}</h2>
                      <p style={{ color: '#b3b3b3', margin: 0 }}>{playing.artist} &middot; {playing.album} &middot; {playing.language}</p>
                    </div>
                  </div>
                  <PlayerControls playing={playing} playlist={activeList} setPlaying={setPlaying} />
                </div>
              )}
              <div style={{ marginTop: '2rem', background: '#181818', borderRadius: '12px', padding: '1rem' }}>
                <h2 style={{ color: '#1db954' }}>My Playlist</h2>
                {playlist.length === 0 ? (
                  <div style={{ color: '#b3b3b3' }}>No songs in playlist.</div>
                ) : (
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {playlist.map(track => (
                      <li key={track.id} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        marginBottom: '1rem' 
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <img src={track.cover} alt="cover" style={{ width: '50px', height: '50px', borderRadius: '6px' }} />
                          <span style={{ color: '#fff' }}>
                            {track.title} - {track.artist} 
                            <span style={{ color: '#b3b3b3', fontStyle: 'italic', marginLeft: '0.5rem' }}>
                              {track.language}
                            </span>
                          </span>
                        </div>
                        <div>
                          <button onClick={() => handlePlay(track)} style={{ 
                            marginRight: '0.5rem', 
                            background: '#1db954', 
                            color: '#fff', 
                            border: 'none', 
                            borderRadius: '6px', 
                            padding: '0.3rem 1rem' 
                          }}>
                            Play
                          </button>
                          <button onClick={() => handleRemoveFromPlaylist(track.id)} style={{ 
                            background: '#ff4d4f', 
                            color: '#fff', 
                            border: 'none', 
                            borderRadius: '6px', 
                            padding: '0.3rem 1rem' 
                          }}>
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div style={{ marginTop: '2rem', background: '#181818', borderRadius: '12px', padding: '1rem' }}>
                <h2 style={{ color: '#1db954' }}>My Favorites</h2>
                {favorites.length === 0 ? (
                  <div style={{ color: '#b3b3b3' }}>No favorite songs.</div>
                ) : (
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {favorites.map(track => (
                      <li key={track.id} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        marginBottom: '1rem' 
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <img src={track.cover} alt="cover" style={{ width: '50px', height: '50px', borderRadius: '6px' }} />
                          <span style={{ color: '#fff' }}>
                            {track.title} - {track.artist} 
                            <span style={{ color: '#b3b3b3', fontStyle: 'italic', marginLeft: '0.5rem' }}>
                              {track.language}
                            </span>
                          </span>
                        </div>
                        <div>
                          <button onClick={() => handlePlay(track)} style={{ 
                            marginRight: '0.5rem', 
                            background: '#1db954', 
                            color: '#fff', 
                            border: 'none', 
                            borderRadius: '6px', 
                            padding: '0.3rem 1rem' 
                          }}>
                            Play
                          </button>
                          <button onClick={() => handleUnfavorite(track.id)} style={{ 
                            background: '#ff4d4f', 
                            color: '#fff', 
                            border: 'none', 
                            borderRadius: '6px', 
                            padding: '0.3rem 1rem' 
                          }}>
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </main>
      <footer style={{ background: '#181818', color: '#b3b3b3', padding: '1rem 2rem', textAlign: 'center', fontSize: '1rem' }}>
        &copy; {new Date().getFullYear()} Anuraagam Music App. All rights reserved.
      </footer>
    </div>
  );
}

export default App;