import { act } from '@testing-library/react';
import React from 'react';
import {
  awaitDataRender,
  changePage,
  findPaginationButtons,
  findSearchInput,
  findSortInput,
  findTypeInput,
  getDataByPageIndex,
  searchName,
  selectSort,
  selectType
} from '../../../../../../../../../test/routes/repositories';
import { repositoryMockApiData } from '../../../../../../../../mocks/server/github/repository/data';
import repositoryMockApiHandlers from '../../../../../../../../mocks/server/github/repository/handlers';
import { arrangeRepositoryRoute } from '../../Repositories.test';

describe('Component/RepositorySearch', () => {
  it('should search repositories by name', async () => {
    act(() => {
      arrangeRepositoryRoute();
    });

    await searchName(await findSearchInput(), 'a');
    await awaitDataRender(repositoryMockApiData.repository.search.name);
  });

  it('should debounce search api', async () => {
    act(() => {
      arrangeRepositoryRoute();
    });
    const searchInput = await findSearchInput();
    const searchRepositoriesSpy = jest.spyOn(repositoryMockApiHandlers, 'searchRepositories');

    await searchName(searchInput, 'test', { delay: 1 });
    await awaitDataRender(repositoryMockApiData.repository.search.name);
    expect(searchRepositoriesSpy).toBeCalledTimes(1);
  });

  it('should search repositories by visibility type', async () => {
    act(() => {
      arrangeRepositoryRoute();
    });
    const typeInput = await findTypeInput();
    const data = repositoryMockApiData.repository.search.visibility;

    expect(typeInput).toBeDefined();
    await selectType(typeInput, /private/i);
    await awaitDataRender(data);
    await selectType(typeInput, /public/i);
    await awaitDataRender(data);
  });

  it('should sort repositories', async () => {
    act(() => {
      arrangeRepositoryRoute();
    });
    const sortInput = await findSortInput();

    expect(sortInput).toBeDefined();
    await selectSort(sortInput);
    await awaitDataRender(repositoryMockApiData.repository.sort);
  });

  it('should reset page during specific searches', async () => {
    act(() => {
      arrangeRepositoryRoute();
    });
    const { nextBtn } = await findPaginationButtons();
    const searchInput = await findSearchInput();
    const typeInput = await findTypeInput();

    await changePage(nextBtn);
    await awaitDataRender(
      getDataByPageIndex(1)
    );
    await selectType(typeInput, /private/i);
    await selectType(typeInput,/all/i);
    await awaitDataRender(
      getDataByPageIndex(0)
    );
    await changePage(nextBtn);
    await awaitDataRender(
      getDataByPageIndex(1)
    );
    await searchName(searchInput, 'a');
    await searchName(searchInput, '');
    await awaitDataRender(
      getDataByPageIndex(0)
    );
  });
});

