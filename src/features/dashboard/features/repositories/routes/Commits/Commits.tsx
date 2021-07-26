import { Grid } from '@material-ui/core';
import React from 'react';
import PageContainer from '../../../../../../shared/components/PageContainer/PageContainer';
import PageHeader from '../../../../../../shared/components/PageHeader/PageHeader';
import CommitsGrid from './components/CommitsGrid/CommitsGrid';
import CommitsPagination from './components/CommitsPagination/CommitsPagination';
import CommitsSearch from './components/CommitsSearch/CommitsSearch';
import CommitsSearchFormContext from './components/CommitsSearch/CommitsSearchFormContext';

const Commits = () => {

  return (
    <CommitsSearchFormContext>
      <PageContainer>
        <PageHeader title="Commits" />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CommitsSearch />
          </Grid>
          <Grid item xs={12}>
            <CommitsGrid />
          </Grid>
          <Grid item xs={12}>
            <CommitsPagination />
          </Grid>
        </Grid>
      </PageContainer>
    </CommitsSearchFormContext>
  )
}

export default Commits;
