import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Tab,
  Tabs,
  Alert,
  Container,
  Stack,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const AuthModal: React.FC = () => {
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError('');
    setOtpSent(false);
    setOtp('');
  };

  const handleSendOtp = async () => {
    dispatch(loginStart());
    setError('');
    try {
      const endpoint = tabValue === 0 ? '/otp/send-otp-email' : '/otp/send-otp-mobile';
      const payload = tabValue === 0 ? { email } : { mobile };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed');
      setOtpSent(true);
    } catch (err) {
      dispatch(loginFailure());
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    dispatch(loginStart());
    try {
      const endpoint = tabValue === 0 ? '/otp/verify-otp-email' : '/otp/verify-otp-mobile';
      const payload = tabValue === 0 ? { email, otp } : { mobile, otp };
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Invalid OTP');
      const user = tabValue === 0 ? email : mobile;
      dispatch(loginSuccess(user));
    } catch (err) {
      dispatch(loginFailure());
      setError('Invalid OTP. Please try again.');
    }
  };

  const isEmailValid = email.includes('@') && email.includes('.');
  const isMobileValid = mobile.length >= 10;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1db954 0%, #1aa34a 100%)',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            backdropFilter: 'blur(20px)',
            backgroundColor: 'rgba(24, 24, 24, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 4,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                  mb: 1,
                }}
              >
                Anuraagam
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Welcome to your music world
              </Typography>
            </Box>

            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              centered
              sx={{
                mb: 2,
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 600,
                },
              }}
            >
              <Tab
                icon={<EmailIcon />}
                label="Email"
                iconPosition="start"
              />
              <Tab
                icon={<PhoneIcon />}
                label="Mobile"
                iconPosition="start"
              />
            </Tabs>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TabPanel value={tabValue} index={0}>
              <Stack spacing={3}>
                {!otpSent ? (
                  <>
                    <TextField
                      fullWidth
                      type="email"
                      label="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      error={email.length > 0 && !isEmailValid}
                      helperText={
                        email.length > 0 && !isEmailValid
                          ? 'Please enter a valid email address'
                          : ''
                      }
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={handleSendOtp}
                      disabled={!isEmailValid}
                      sx={{ py: 1.5 }}
                    >
                      Send OTP
                    </Button>
                  </>
                ) : (
                  <>
                    <TextField
                      fullWidth
                      label="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      type={showOtp ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowOtp(!showOtp)}
                              edge="end"
                            >
                              {showOtp ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      helperText="Demo OTP: 123456"
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={handleVerifyOtp}
                      disabled={otp.length !== 6}
                      sx={{ py: 1.5 }}
                    >
                      Verify OTP
                    </Button>
                    <Button
                      fullWidth
                      variant="text"
                      onClick={() => {
                        setOtpSent(false);
                        setOtp('');
                        setError('');
                      }}
                    >
                      Back to Email
                    </Button>
                  </>
                )}
              </Stack>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Stack spacing={3}>
                {!otpSent ? (
                  <>
                    <TextField
                      fullWidth
                      type="tel"
                      label="Mobile Number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      error={mobile.length > 0 && !isMobileValid}
                      helperText={
                        mobile.length > 0 && !isMobileValid
                          ? 'Please enter a valid mobile number'
                          : ''
                      }
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={handleSendOtp}
                      disabled={!isMobileValid}
                      sx={{ py: 1.5 }}
                    >
                      Send OTP
                    </Button>
                  </>
                ) : (
                  <>
                    <TextField
                      fullWidth
                      label="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                      type={showOtp ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowOtp(!showOtp)}
                              edge="end"
                            >
                              {showOtp ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      helperText="Demo OTP: 123456"
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={handleVerifyOtp}
                      disabled={otp.length !== 6}
                      sx={{ py: 1.5 }}
                    >
                      Verify OTP
                    </Button>
                    <Button
                      fullWidth
                      variant="text"
                      onClick={() => {
                        setOtpSent(false);
                        setOtp('');
                        setError('');
                      }}
                    >
                      Back to Mobile
                    </Button>
                  </>
                )}
              </Stack>
            </TabPanel>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default AuthModal;