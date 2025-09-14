import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, color = 'primary.main' }) => {
  return (
    <Card>
      <CardContent sx={{ textAlign: 'center' }}>
        <Box sx={{ mb: 1, color }}>
          {icon}
        </Box>
        <Typography variant="h4" fontWeight={600} sx={{ color, mb: 0.5 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;