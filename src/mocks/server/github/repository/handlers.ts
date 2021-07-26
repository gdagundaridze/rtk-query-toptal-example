import formatLinkHeader from 'format-link-header';
import { chunk } from 'lodash';
import { createHeaderLink } from '../../../../../test/utils/createHeaderLink';
import { commitsSearchFormDefaultValues } from '../../../../features/dashboard/features/repositories/routes/Commits/components/CommitsSearch/CommitsSearchFormContext';
import { repositorySearchFormDefaultValues } from '../../../../features/dashboard/features/repositories/routes/Repositories/components/RepositorySearch/RepositorySearchFormContext';
import { MockAPIHandler } from '../../types';
import { repositoryMockApiData } from './data';

export const repositoryMockApiHandlerDefaults = {
  searchRepositories: {
    ...repositorySearchFormDefaultValues
  },
  getRepositoryCommits: {
    ...commitsSearchFormDefaultValues,
    branch: repositoryMockApiData.branch.base[0].name,
    per_page: 5
  }
}

const searchRepositories: MockAPIHandler = (req, res, ctx) => {
  const queryParams = req.url.searchParams;
  const q = queryParams.get('q') || '';
  const perPage = Number(queryParams.get('per_page')) || repositoryMockApiHandlerDefaults.searchRepositories.per_page;
  const page = Number(queryParams.get('page')) || repositoryMockApiHandlerDefaults.searchRepositories.page;
  const sort = queryParams.get('sort') || repositoryMockApiHandlerDefaults.searchRepositories.sort;
  const baseResponse = {
    total_count: 1,
    incomplete_results: false
  }

  if (q.includes('in:name')) {
    return res(
      ctx.json({
        ...baseResponse,
        items: repositoryMockApiData.repository.search.name,
      })
    );
  }

  if (q.includes('is:private') || q.includes('is:public')) {
    return res(
      ctx.json({
        ...baseResponse,
        items: repositoryMockApiData.repository.search.visibility,
      })
    );
  }

  if (sort && sort !== repositoryMockApiHandlerDefaults.searchRepositories.sort) {
    return res(
      ctx.json({
        ...baseResponse,
        items: repositoryMockApiData.repository.sort,
      })
    );
  }

  return res(
    ctx.json({
      ...baseResponse,
      total_count: repositoryMockApiData.repository.base.length,
      items: chunk(repositoryMockApiData.repository.base, perPage)[page - 1],
    })
  );
};

const getRepositoryBranches: MockAPIHandler = (req, res, ctx) => {
  return res(ctx.json(
    repositoryMockApiData.branch.base
  ));
};

const getRepositoryCommits: MockAPIHandler = (req, res, ctx) => {
  const queryParams = req.url.searchParams;
  const sha = queryParams.get('sha');
  const maxPage = Math.ceil(repositoryMockApiData.commit.base.length / repositoryMockApiHandlerDefaults.getRepositoryCommits.per_page);
  const page = Number(queryParams.get('page')) || repositoryMockApiHandlerDefaults.getRepositoryCommits.page;

  if (sha && sha !== repositoryMockApiHandlerDefaults.getRepositoryCommits.branch) {
    return res(ctx.json(
      repositoryMockApiData.commit.search.branch
    ));
  }

  return res(
    ctx.set({
      'Link': formatLinkHeader(createHeaderLink(page, maxPage))
    }),
    ctx.json(
      chunk(repositoryMockApiData.commit.base, 5)[page - 1]
    )
  );
}

const repositoryMockApiHandlers = {
  searchRepositories,
  getRepositoryBranches,
  getRepositoryCommits
}

export default repositoryMockApiHandlers;
