import { Box, Grid, Typography } from '@material-ui/core';
import React, { FC } from 'react';

const PageHeader: FC<{ title: string }> = ({
  title
}) => {
  return (
    <Box clone marginBottom={4}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4">
            {title}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PageHeader;
