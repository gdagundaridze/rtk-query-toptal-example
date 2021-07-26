import { setupServer } from 'msw/node';
import { authMockApiEndpoints } from './auth/endpoints';
import { repositoryMockApiEndpoints } from './github/repository/endpoints';
import { userMockApiEndpoints } from './github/user/endpoints';

export const mockServer = setupServer(...[
  ...authMockApiEndpoints,
  ...userMockApiEndpoints,
  ...repositoryMockApiEndpoints
]);
