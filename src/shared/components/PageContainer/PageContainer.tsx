import { Box, Container } from '@material-ui/core';
import React, { FC } from 'react';

const PageContainer: FC = ({ children }) => {
  return (
    <Box paddingTop={3} clone>
      <Container maxWidth="lg">
        <>
          {children}
        </>
      </Container>
    </Box>
  )
}

export default PageContainer;
