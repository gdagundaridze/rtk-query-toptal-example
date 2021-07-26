import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@material-ui/core';
import { useFormikContext } from 'formik';
import React, { FC, useCallback, useMemo } from 'react';
import {
  RepositoryVisibilityEnum,
  SearchRepositorySortEnum
} from '../../../../../../../../api/github/repository/enums';
import { repositorySearchFormDefaultValues } from './RepositorySearchFormContext';
import { RepositorySearchFormValues } from './types';

const RepositorySearch: FC = () => {
  const { values, handleChange, touched, setFieldValue } = useFormikContext<RepositorySearchFormValues>();

  const handleChangeAndResetPage = useCallback((e: React.ChangeEvent<any>) => {
    handleChange(e);
    setFieldValue('page', repositorySearchFormDefaultValues.page);
  }, [handleChange, setFieldValue]);

  return useMemo(() => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          name="name"
          value={values.name}
          onChange={handleChangeAndResetPage}
          error={touched.name}
          helperText={touched.name}
          placeholder="Find a repository..."
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid item xs={3}>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel>Type</InputLabel>
          <Select
            name="type"
            value={values.type}
            onChange={handleChangeAndResetPage}
            error={touched.type}
            inputProps={{
              'aria-label': 'type'
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value={RepositoryVisibilityEnum.PUBLIC}>Public</MenuItem>
            <MenuItem value={RepositoryVisibilityEnum.PRIVATE}>Private</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel>Sort</InputLabel>
          <Select
            name="sort"
            value={values.sort}
            onChange={handleChange}
            error={touched.sort}
            inputProps={{
              'aria-label': 'sort'
            }}
          >
            <MenuItem value={SearchRepositorySortEnum.BEST_MATCH}>{SearchRepositorySortEnum.BEST_MATCH}</MenuItem>
            <MenuItem value={SearchRepositorySortEnum.FORKS}>{SearchRepositorySortEnum.FORKS}</MenuItem>
            <MenuItem value={SearchRepositorySortEnum.HELP_WANTED_ISSUES}>{SearchRepositorySortEnum.HELP_WANTED_ISSUES}</MenuItem>
            <MenuItem value={SearchRepositorySortEnum.STARS}>{SearchRepositorySortEnum.STARS}</MenuItem>
            <MenuItem value={SearchRepositorySortEnum.UPDATED}>{SearchRepositorySortEnum.UPDATED}</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  ), [values, handleChange, touched, handleChangeAndResetPage]);
}

export default RepositorySearch;
