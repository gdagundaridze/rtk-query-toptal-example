import { rest } from 'msw';
import { authMockApiHandlers } from './handlers';

export const authMockApiEndpoints = [
  rest.post(
    /github\/access_token/i,
    (...args) => authMockApiHandlers.accessToken(...args)
  ),
]
