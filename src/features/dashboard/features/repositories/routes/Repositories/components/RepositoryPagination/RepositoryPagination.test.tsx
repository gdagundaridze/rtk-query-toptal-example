import { act } from '@testing-library/react';
import React from 'react';
import {
  awaitDataRender,
  changePage,
  findAllDataRows,
  findPaginationButtons,
  findRowsPerPageInput,
  getDataByPageIndex,
  selectPerPage
} from '../../../../../../../../../test/routes/repositories';
import { repositoryMockApiData } from '../../../../../../../../mocks/server/github/repository/data';
import { repositoryMockApiHandlerDefaults } from '../../../../../../../../mocks/server/github/repository/handlers';
import { arrangeRepositoryRoute } from '../../Repositories.test';
import { repositoriesPerPage } from './RepositoryPagination';

describe('Component/RepositoryPagination', () => {
  it('should paginate back&forth', async () => {
    act(() => {
      arrangeRepositoryRoute();
    });
    const { prevBtn, nextBtn } = await findPaginationButtons();

    await changePage(nextBtn);
    await awaitDataRender(getDataByPageIndex(1));
    await changePage(prevBtn);
    await awaitDataRender(getDataByPageIndex(0));
  });

  it('should change per page', async () => {
    act(() => {
      arrangeRepositoryRoute();
    });

    await selectPerPage(await findRowsPerPageInput(), repositoriesPerPage[1]);
    expect((await findAllDataRows()).length).toBe(repositoriesPerPage[1]);
  });

  it('should have correct pagination buttons disable state on page 1', async () => {
    act(() => {
      arrangeRepositoryRoute();
    });
    const { prevBtn, nextBtn } = await findPaginationButtons();
    expect(prevBtn).toHaveAttribute('disabled');
    expect(nextBtn).not.toHaveAttribute('disabled');
  });

  it('should have correct pagination buttons disable state on page 2', async () => {
    act(() => {
      arrangeRepositoryRoute();
    });
    const { prevBtn, nextBtn } = await findPaginationButtons();

    await changePage(nextBtn);
    expect(prevBtn).not.toHaveAttribute('disabled');
    expect(nextBtn).not.toHaveAttribute('disabled');
  });

  it('should have correct pagination buttons disable state on last page', async () => {
    act(() => {
      arrangeRepositoryRoute();
    });
    const { prevBtn, nextBtn } = await findPaginationButtons();
    const navigateToLastPage = async () => {
      const { per_page, page } = repositoryMockApiHandlerDefaults.searchRepositories;
      const maxPage = Math.ceil(repositoryMockApiData.repository.base.length / per_page);
      for(let i = page; i < maxPage; i++) {
        await changePage(nextBtn);
      }
    };

    await navigateToLastPage();
    expect(prevBtn).not.toHaveAttribute('disabled');
    expect(nextBtn).toHaveAttribute('disabled');
  });
});

