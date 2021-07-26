import { setupServer } from 'msw/node';
import { authMockApiEndpoints } from './auth/endpoints';
import { userMockApiEndpoints } from './github/user/endpoints';

export const mockServer = setupServer(...[
  ...authMockApiEndpoints,
  ...userMockApiEndpoints,
]);
