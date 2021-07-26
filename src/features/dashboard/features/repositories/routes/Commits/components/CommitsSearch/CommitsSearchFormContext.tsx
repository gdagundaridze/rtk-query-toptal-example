import { Formik } from 'formik';
import { isUndefined, noop, omitBy } from 'lodash';
import React, { FC, useEffect } from 'react';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';
import { useCommitsSearchFormContext } from '../../hooks/useCommitsSearchFormContext';
import { useGetRepositoryBranchesState } from '../../hooks/useGetRepositoryBranches';

export const commitsSearchFormDefaultValues = {
  branch: '',
  page: 1
}

const QueryParamsMiddleware: FC = ({ children }) => {
  const { values, dirty } = useCommitsSearchFormContext();
  const [, setQueryParams] = useQueryParams({
    branch: StringParam,
    page: NumberParam,
  });

  useEffect(() => {
    if (!dirty) return;

    setQueryParams(values)
  }, [values, dirty, setQueryParams]);

  return children as React.ReactElement;
}

const CommitsSearchFormContext: FC = ({ children }) => {
  const { data: repositoryBranches } = useGetRepositoryBranchesState();
  const [queryParams] = useQueryParams({
    branch: StringParam,
    page: NumberParam,
  });

  return (
    <Formik
      enableReinitialize
      initialValues={{
        ...commitsSearchFormDefaultValues,
        branch: repositoryBranches?.response?.[0]?.name || '',
        ...(omitBy(queryParams, isUndefined))
      }}
      onSubmit={noop}
    >
      <QueryParamsMiddleware>
        {children}
      </QueryParamsMiddleware>
    </Formik>
  )
}

export default CommitsSearchFormContext;
