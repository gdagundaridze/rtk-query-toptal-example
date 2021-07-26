import { Formik } from 'formik';
import { noop } from 'lodash';
import React, { FC } from 'react';
import { SearchRepositorySortEnum } from '../../../../../../../../api/github/repository/enums';

export const repositorySearchFormDefaultValues = {
  name: '',
  type: '',
  sort: SearchRepositorySortEnum.BEST_MATCH,
  per_page: 5,
  page: 1
}

const RepositorySearchFormContext: FC = ({ children }) => {
  return (
    <Formik
      initialValues={repositorySearchFormDefaultValues}
      onSubmit={noop}
    >
      {children}
    </Formik>
  )
}

export default RepositorySearchFormContext;
