import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { hideNotification } from '../../store/slices/uiSlice';
import Sidebar from './Sidebar';
import MusicPlayer from '../MusicPlayer/MusicPlayer';
import AuthModal from '../Auth/AuthModal';
import { NotificationSnackbar } from '../common';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { currentTrack } = useSelector((state: RootState) => state.player);
  const { notification } = useSelector((state: RootState) => state.ui);

  const handleCloseNotification = () => {
    dispatch(hideNotification());
  };

  if (!isAuthenticated) {
    return <AuthModal />;
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          ml: isMobile ? 0 : '240px',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            pb: currentTrack ? '120px' : 0,
          }}
        >
          {children}
        </Box>
        {currentTrack && <MusicPlayer />}
      </Box>
      
      <NotificationSnackbar
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseNotification}
      />
    </Box>
  );
};

export default Layout;