import { chunk } from 'lodash';
import { repositorySearchFormDefaultValues } from '../../../../features/dashboard/features/repositories/routes/Repositories/components/RepositorySearch/RepositorySearchFormContext';
import { MockAPIHandler } from '../../types';
import { repositoryMockApiData } from './data';

export const repositoryMockApiHandlerDefaults = {
  searchRepositories: {
    ...repositorySearchFormDefaultValues
  },
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

const repositoryMockApiHandlers = {
  searchRepositories,
}

export default repositoryMockApiHandlers;
