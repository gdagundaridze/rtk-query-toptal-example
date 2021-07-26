import { Matcher } from '@testing-library/dom/types/matches';
import { act, fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { chunk } from 'lodash';
import { SearchRepositorySortEnum } from '../../src/api/github/repository/enums';
import { Repository } from '../../src/api/github/repository/types';
import { repositoryMockApiData } from '../../src/mocks/server/github/repository/data';
import { repositoryMockApiHandlerDefaults } from '../../src/mocks/server/github/repository/handlers';

export const findAllDataRows = async () => {
  return await screen.findAllByRole('link', { name: /commit-link/i });
}

export const awaitDataRender = async (data: Repository[]) => {
  for(let i = 0; i < data.length; i++) {
    expect(await screen.findByText(data[i].name)).toBeDefined();
  }
}

export const getDataByPageIndex = (page: number) => {
  const { per_page } = repositoryMockApiHandlerDefaults.searchRepositories;
  return chunk(repositoryMockApiData.repository.base, per_page)[page];
}

export const findPaginationButtons = async () => {
  const prevBtn = await screen.findByRole('button', { name: /previous/i });
  const nextBtn = await screen.findByRole('button', { name: /next/i });
  return {
    prevBtn,
    nextBtn
  }
}

export const findRowsPerPageInput = async () => {
  return await screen.findByLabelText(/rows per page/i);
}

export const changePage = async (btnEl: Element) => {
  await act(async () => {
    userEvent.click(btnEl);
  });
};

export const selectPerPage = async (rowsPerPageInput: Element, perPage: number) => {
  await act(async () => {
    fireEvent.mouseDown(rowsPerPageInput);
    const listBox = within(await screen.findByRole('listbox'));
    userEvent.click(listBox.getByText(perPage));
  })
}

export const findTypeInput = async () => {
  return await screen.findByLabelText(/type/i);
}

export const findSearchInput = async () => {
  return await screen.findByPlaceholderText(/find a repository/i);
}

export const findSortInput = async () => {
  return await screen.findByLabelText(/sort/i);
}

export const searchName = async (element: Element, text: string, opts = { delay: 0 }) => {
  await act(async () => {
    if (text.length === 0) {
      await userEvent.clear(element);
    } else {
      await userEvent.type(element, text, opts);
    }
  });
}

export const selectType = async (typeInput: Element, id: Matcher) => {
  await act(async () => {
    fireEvent.mouseDown(typeInput);
    const listBox = within(await screen.findByRole('listbox'));
    userEvent.click(listBox.getByText(id));
  })
}

export const selectSort = async (sortInput: Element) => {
  await act(async () => {
    fireEvent.mouseDown(sortInput);
    const listBox = within(await screen.findByRole('listbox'));
    userEvent.click(listBox.getByText(SearchRepositorySortEnum.STARS));
  })
}
