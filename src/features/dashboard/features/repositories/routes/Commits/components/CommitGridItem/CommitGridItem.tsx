import { Typography, Avatar, Box, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import format from 'date-fns/format';
import React, { FC } from 'react';
import { RepositoryCommit } from '../../../../../../../../api/github/repository/types';

type CommitGridItemProps = {
  commit: RepositoryCommit;
  hasBorderTop: boolean;
}

const CommitGridItem: FC<CommitGridItemProps> = ({
  commit,
  hasBorderTop
}) => {
  const theme = useTheme();

  return (
    <Box clone borderTop={hasBorderTop ? 1 : 0} borderColor="rgb(177, 186, 196)" padding={2}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <Box clone fontWeight={theme.typography.fontWeightMedium}>
              <Typography variant="body1">
                {commit.commit.message}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Box clone width={24} height={24} marginRight={1}>
                <Avatar src={commit.author?.avatar_url} />
              </Box>
              <Box clone marginRight={1} fontWeight={theme.typography.fontWeightMedium}>
                <Typography component="span" variant="body2">
                  {commit.commit.author?.name}
                </Typography>
              </Box>
              <Typography component="span" variant="body2" color="textSecondary">
                committed on {format(new Date(commit.commit.author!.date!), 'MMM dd, yyyy')}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default CommitGridItem;
