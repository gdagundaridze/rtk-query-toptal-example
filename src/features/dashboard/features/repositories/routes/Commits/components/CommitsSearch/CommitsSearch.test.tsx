import { act } from '@testing-library/react';
import React from 'react';
import {
  awaitDataRender,
  changeBranch,
  changePage,
  findBranchInput,
  findPaginationButtons,
  getDataByPageIndex
} from '../../../../../../../../../test/routes/commits';
import { repositoryMockApiData } from '../../../../../../../../mocks/server/github/repository/data';
import { arrangeCommitsRoute } from '../../Commits.test';


describe('Component/CommitsSearch', () => {
  it('should search commits by branch', async () => {
    act(() => {
      arrangeCommitsRoute();
    })

    await awaitDataRender(getDataByPageIndex(0));
    await changeBranch(await findBranchInput(), repositoryMockApiData.branch.base[1].name);
    await awaitDataRender(repositoryMockApiData.commit.search.branch);
  });

  it('should reset page during specific searches', async () => {
    act(() => {
      arrangeCommitsRoute();
    })
    const branchInput = await findBranchInput();
    const { nextBtn } = await findPaginationButtons();

    await changePage(nextBtn);
    await awaitDataRender(getDataByPageIndex(1));
    await changeBranch(branchInput, repositoryMockApiData.branch.base[1].name);
    await changeBranch(branchInput, repositoryMockApiData.branch.base[0].name);
    await awaitDataRender(getDataByPageIndex(0));
  });
});

