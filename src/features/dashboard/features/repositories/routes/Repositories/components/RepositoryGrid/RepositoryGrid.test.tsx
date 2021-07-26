import { act, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import {
  awaitDataRender,
  findAllDataRows,
  getDataByPageIndex
} from '../../../../../../../../../test/routes/repositories';
import repositoryMockApiHandlers, { repositoryMockApiHandlerDefaults } from '../../../../../../../../mocks/server/github/repository/handlers';
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

  it('should prefetch branches and commits', async () => {
    act(() => {
      arrangeRepositoryRoute();
    });
    const commitLink = (await findAllDataRows())[0];
    const getBranchesSpy = jest.spyOn(repositoryMockApiHandlers, 'getRepositoryBranches');
    const getCommitsSpy = jest.spyOn(repositoryMockApiHandlers, 'getRepositoryCommits');

    expect(commitLink).toBeDefined();

    fireEvent.mouseEnter(commitLink);
    await waitFor(() => {
      expect(getBranchesSpy).toHaveBeenCalled();
      expect(getCommitsSpy).toHaveBeenCalled();
    });
  });
});

