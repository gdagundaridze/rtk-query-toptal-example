import { act, fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { chunk } from 'lodash';
import { RepositoryCommit } from '../../src/api/github/repository/types';
import { repositoryMockApiData } from '../../src/mocks/server/github/repository/data';
import { repositoryMockApiHandlerDefaults } from '../../src/mocks/server/github/repository/handlers';

export const awaitDataRender = async (data: RepositoryCommit[]) => {
  for(let i = 0; i < data.length; i++) {
    expect(await screen.findByText(data[i].commit.message)).toBeDefined();
  }
}

export const getDataByPageIndex = (page: number) => {
  return chunk(repositoryMockApiData.commit.base, repositoryMockApiHandlerDefaults.getRepositoryCommits.per_page)[page];
}

export const findPaginationButtons = async () => {
  const prevBtn = await screen.findByRole('button', { name: /newer/i });
  const nextBtn = await screen.findByRole('button', { name: /older/i });
  return {
    prevBtn,
    nextBtn
  }
}

export const changePage = async (btnEl: Element) => {
  await act(async () => {
    userEvent.click(btnEl);
  });
};

export const findBranchInput = async () => {
  return await screen.findByLabelText(/branch/i);
}

export const changeBranch = async (branchInput: Element, branchName: string) => {
  await act(async () => {
    fireEvent.mouseDown(branchInput);
    const listBox = within(await screen.findByRole('listbox'));
    const branchToSelect = await listBox.findByText(branchName);
    userEvent.click(branchToSelect);
  })
}
