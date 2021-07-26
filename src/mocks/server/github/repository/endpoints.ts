import { rest } from 'msw';
import repositoryMockApiHandlers from './handlers';

export const repositoryMockApiEndpoints = [
  rest.get(
    /search\/repositories/i,
    (...args) => repositoryMockApiHandlers.searchRepositories(...args)
  ),
]
