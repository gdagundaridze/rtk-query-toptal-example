import { Badge, Box, Chip, Divider, Grid, Typography } from '@material-ui/core';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import formatDistance from 'date-fns/formatDistance';
import React, { FC } from 'react';
import { Repository } from '../../../../../../../../api/github/repository/types';

const RepositoryGridItem: FC<{ repo: Repository }> = ({
  repo
}) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" gutterBottom>
          {repo.name}
          <Box marginLeft={1} clone>
            <Chip label={repo.private ? 'Private' : 'Public'} size="small" />
          </Box>
        </Typography>
        <Typography component="p" variant="subtitle2" gutterBottom color="textSecondary">
          {repo.description}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container alignItems="center" spacing={2}>
          <Box clone flex="0 0 auto" display="flex" alignItems="center" marginRight={2}>
            <Grid item>
              <Box clone marginRight={1} marginLeft={0.5}>
                <Badge color="primary" variant="dot" />
              </Box>
              <Typography variant="body2" color="textSecondary">
                {repo.language}
              </Typography>
            </Grid>
          </Box>
          <Box clone flex="0 0 auto" display="flex" alignItems="center" marginRight={2}>
            <Grid item>
              <Box clone marginRight={0.5}>
                <StarOutlineIcon fontSize="small" />
              </Box>
              <Typography variant="body2" color="textSecondary">
                {repo.stargazers_count}
              </Typography>
            </Grid>
          </Box>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              Updated {formatDistance(new Date(repo.pushed_at), new Date())} ago
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
      <Divider />
      </Grid>
    </Grid>
  )
}

export default RepositoryGridItem;
