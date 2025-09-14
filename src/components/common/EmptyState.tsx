import React from 'react';
import { Box, Typography } from '@mui/material';

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle, icon }) => {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      {icon && (
        <Box sx={{ mb: 2, opacity: 0.5 }}>
          {icon}
        </Box>
      )}
      <Typography variant="h5" color="text.secondary">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default EmptyState;