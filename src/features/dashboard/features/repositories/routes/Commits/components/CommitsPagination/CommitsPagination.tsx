import { Button, ButtonGroup, Grid } from '@material-ui/core';
import React, { FC, useMemo } from 'react';
import { useCommitsSearchFormContext } from '../../hooks/useCommitsSearchFormContext';
import { useGetRepositoryCommitsState } from '../../hooks/useGetRepositoryCommits';

const CommitsPagination: FC = () => {
  const { setFieldValue } = useCommitsSearchFormContext();
  const { data } = useGetRepositoryCommitsState();

  return useMemo(() => (
    <Grid container justify="center">
      <ButtonGroup variant="contained" color="default" aria-label="contained primary button group" disableElevation size="small">
        <Button
          disabled={!data?.prev}
          onClick={() => {
            setFieldValue('page', Number(data!.prev!.page));
          }}
        >
          Newer
        </Button>
        <Button
          disabled={!data?.next}
          onClick={() => {
            setFieldValue('page', Number(data!.next!.page));
          }}
        >
          Older
        </Button>
      </ButtonGroup>
    </Grid>
  ), [setFieldValue, data]);
}

export default CommitsPagination;
