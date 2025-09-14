import React from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import {
  Person,
  QueueMusic,
  Favorite,
  History,
  Settings,
  Logout,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { playlist, favorites } = useSelector((state: RootState) => state.playlist);

  const handleLogout = () => {
    dispatch(logout());
  };

  const stats = [
    {
      label: 'Songs in Playlist',
      value: playlist.length,
      icon: <QueueMusic color="primary" />,
      color: 'primary.main',
    },
    {
      label: 'Favorite Songs',
      value: favorites.length,
      icon: <Favorite color="error" />,
      color: 'error.main',
    },
    {
      label: 'Total Listening Time',
      value: '12h 34m',
      icon: <History color="info" />,
      color: 'info.main',
    },
  ];

  const recentActivity = [
    'Added "Song Title 1" to playlist',
    'Favorited "Song Title 2"',
    'Played "Song Title 3"',
    'Created new playlist',
    'Shared playlist with friends',
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #1db954, #1ed760)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
          }}
        >
          Profile
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Manage your account and preferences
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Info */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: 'primary.main',
                  fontSize: '3rem',
                  fontWeight: 700,
                  mx: 'auto',
                  mb: 2,
                }}
              >
                {user?.charAt(0).toUpperCase()}
              </Avatar>
              
              <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
                Welcome Back!
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {user}
              </Typography>
              
              <Chip
                label="Premium User"
                color="primary"
                variant="outlined"
                sx={{ mb: 3 }}
              />
              
              <Stack spacing={2}>
                <Button
                  variant="outlined"
                  startIcon={<Settings />}
                  fullWidth
                >
                  Account Settings
                </Button>
                
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Logout />}
                  onClick={handleLogout}
                  fullWidth
                >
                  Logout
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Stats and Activity */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            {/* Stats */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Your Music Stats
                </Typography>
                
                <Grid container spacing={2}>
                  {stats.map((stat, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 2,
                          backgroundColor: 'background.default',
                          textAlign: 'center',
                        }}
                      >
                        <Box sx={{ mb: 1 }}>
                          {stat.icon}
                        </Box>
                        <Typography
                          variant="h4"
                          fontWeight={600}
                          sx={{ color: stat.color, mb: 0.5 }}
                        >
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stat.label}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Recent Activity
                </Typography>
                
                <List disablePadding>
                  {recentActivity.map((activity, index) => (
                    <React.Fragment key={index}>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemText
                          primary={activity}
                          secondary={`${index + 1} day${index === 0 ? '' : 's'} ago`}
                        />
                      </ListItem>
                      {index < recentActivity.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Preferences
                </Typography>
                
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1">Auto-play similar songs</Typography>
                    <Chip label="Enabled" color="success" size="small" />
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1">High quality audio</Typography>
                    <Chip label="Enabled" color="success" size="small" />
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1">Crossfade</Typography>
                    <Chip label="Disabled" color="default" size="small" />
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body1">Notifications</Typography>
                    <Chip label="Enabled" color="success" size="small" />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile;