import React from 'react';
import { Box, Typography } from '@mui/material';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
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
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="h6" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default PageHeader;