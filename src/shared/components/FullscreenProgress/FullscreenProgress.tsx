import { CircularProgress, Box } from '@material-ui/core';
import React from 'react';

const FullscreenProgress = () => {
  return (
    <Box position="absolute" width="100%" height="100vh" justifyContent="center" alignItems="center" display="flex">
      <CircularProgress />
    </Box>
  );
}

export default FullscreenProgress;
