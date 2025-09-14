import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { store } from './store';
import theme from './theme';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Playlist from './pages/Playlist/Playlist';
import Favorites from './pages/Favorites/Favorites';
import Profile from './pages/Profile/Profile';

const createEmotionCache = () => {
  return createCache({
    key: 'mui',
    prepend: true,
  });
};

const emotionCache = createEmotionCache();

function App() {
  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/playlist" element={<Playlist />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Layout>
          </Router>
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}

export default App;