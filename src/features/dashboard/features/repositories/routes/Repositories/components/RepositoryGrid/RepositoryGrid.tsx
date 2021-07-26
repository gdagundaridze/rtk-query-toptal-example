import { Grid } from '@material-ui/core';
import React, { useMemo } from 'react';
import GridProgress from '../../../../../../../../shared/components/GridProgress/GridProgress';
import { useSearchRepositories } from '../../hooks/useSearchRepositories';
import RepositoryGridItem from '../RepositoryGridItem/RepositoryGridItem';

const RepositoryGrid = () => {
  const { data, isFetching, isUninitialized } = useSearchRepositories();
  const isLoading = isFetching || isUninitialized;

  return useMemo(() => (
    <GridProgress
      container
      spacing={2}
      loading={isLoading}
    >
      {data?.response.items?.map((repo: any) => (
        <Grid item sm={12} key={repo.id}>
          <RepositoryGridItem repo={repo} />
        </Grid>
      ))}
    </GridProgress>
  ), [isLoading, data]);
}

export default RepositoryGrid;
