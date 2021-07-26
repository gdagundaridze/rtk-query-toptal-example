import { Box, Typography, Grid } from '@material-ui/core';
import format from 'date-fns/format';
import React, { useMemo } from 'react';
import GridProgress from '../../../../../../../../shared/components/GridProgress/GridProgress';
import { useAggregatedRepositoryCommitsData, useGetRepositoryCommits } from '../../hooks/useGetRepositoryCommits';
import CommitGridItem from '../CommitGridItem/CommitGridItem';

const CommitsGrid = () => {
  const { isFetching, isUninitialized } = useGetRepositoryCommits();
  const aggregatedRepositoryCommits = useAggregatedRepositoryCommitsData();
  const isLoading = isFetching || isUninitialized;

  return useMemo(() => (
    <GridProgress
      container
      spacing={2}
      loading={isLoading}
    >
      {aggregatedRepositoryCommits.map((aggregatedCommit) => (
        <Grid item sm={12} key={aggregatedCommit.date}>
          <Grid container spacing={2}>
            <Grid item sm={12}>
              <Typography variant="body2">
                Commits on {format(new Date(aggregatedCommit.date), 'MMM dd, yyyy')}
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Box clone border={1} borderRadius={4} borderColor="rgb(177, 186, 196)">
                <Grid container>
                  {aggregatedCommit.commits.map((commit, commitIndex) => (
                    <Grid item sm={12} key={commit.node_id}>
                      <CommitGridItem hasBorderTop={commitIndex !== 0} commit={commit} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </GridProgress>
  ), [isLoading, aggregatedRepositoryCommits]);
}

export default CommitsGrid;
