import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useCallback, useMemo } from 'react';
import { useCommitsSearchFormContext } from '../../hooks/useCommitsSearchFormContext';
import { useGetRepositoryBranches } from '../../hooks/useGetRepositoryBranches';
import { commitsSearchFormDefaultValues } from './CommitsSearchFormContext';

const CommitsSearch = () => {
  const { data: repositoryBranches } = useGetRepositoryBranches();
  const { values, handleChange, touched, setFieldValue } = useCommitsSearchFormContext();

  const handleChangeAndResetPage = useCallback((e: React.ChangeEvent<any>) => {
    handleChange(e);
    setFieldValue('page', commitsSearchFormDefaultValues.page);
  }, [handleChange, setFieldValue]);

  return useMemo(() => (
    <Grid container>
      <Grid item xs={4}>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel>Branch</InputLabel>
          <Select
            name="branch"
            value={values.branch}
            onChange={handleChangeAndResetPage}
            error={touched.branch}
            inputProps={{
              'aria-label': 'branch'
            }}
          >
            {repositoryBranches && repositoryBranches.response.map((branch) => {
              return (
                <MenuItem key={branch.name} value={branch.name}>{branch.name}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  ), [values, handleChangeAndResetPage, touched, repositoryBranches]);
}

export default CommitsSearch;
