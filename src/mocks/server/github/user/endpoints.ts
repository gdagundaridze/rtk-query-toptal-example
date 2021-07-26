import { rest } from 'msw';
import { userMockApiHandlers } from './handlers';

export const userMockApiEndpoints = [
  rest.get(
    /user/i,
    (...args) => userMockApiHandlers.getUser(...args)
  ),
]
