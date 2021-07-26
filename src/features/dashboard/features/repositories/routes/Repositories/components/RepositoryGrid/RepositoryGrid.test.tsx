import { act } from '@testing-library/react';
import React from 'react';
import {
  awaitDataRender,
  findAllDataRows,
  getDataByPageIndex
} from '../../../../../../../../../test/routes/repositories';
import { repositoryMockApiHandlerDefaults } from '../../../../../../../../mocks/server/github/repository/handlers';
import { arrangeRepositoryRoute } from '../../Repositories.test';

describe('Component/RepositoryGrid', () => {
  it('should render initial data only', async () => {
    act(() => {
      arrangeRepositoryRoute();
    });
    const { per_page, page } = repositoryMockApiHandlerDefaults.searchRepositories;

    await awaitDataRender(getDataByPageIndex(page - 1));
    expect((await findAllDataRows()).length).toBe(per_page);
  });
});

