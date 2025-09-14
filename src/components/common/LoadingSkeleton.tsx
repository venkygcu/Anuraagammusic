import React from 'react';
import { Grid, Card, CardContent, Skeleton } from '@mui/material';

interface LoadingSkeletonProps {
  count?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ count = 12 }) => {
  return (
    <>
      {Array.from(new Array(count)).map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card>
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
              <Skeleton variant="text" height={24} />
              <Skeleton variant="text" height={20} width="60%" />
              <Skeleton variant="text" height={16} width="40%" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default LoadingSkeleton;