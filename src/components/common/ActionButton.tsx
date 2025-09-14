import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface ActionButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      sx={{
        borderRadius: 3,
        textTransform: 'none',
        fontWeight: 600,
        px: 3,
        py: 1,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ActionButton;