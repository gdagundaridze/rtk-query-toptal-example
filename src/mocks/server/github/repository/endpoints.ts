import { rest } from 'msw';
import repositoryMockApiHandlers from './handlers';

export const repositoryMockApiEndpoints = [
  rest.get(
    /search\/repositories/i,
    (...args) => repositoryMockApiHandlers.searchRepositories(...args)
  ),
  rest.get(
    /repos\/.+\/.+\/branches/i,
    (...args) => repositoryMockApiHandlers.getRepositoryBranches(...args)
  ),
  rest.get(
    /repos\/.+\/.+\/commits/i,
    (...args) => repositoryMockApiHandlers.getRepositoryCommits(...args)
  )
]
