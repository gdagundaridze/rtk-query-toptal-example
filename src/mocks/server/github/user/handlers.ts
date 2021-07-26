import { MockAPIHandler } from '../../types';
import { VALID_ACCESS_TOKEN } from './constants';
import { userMockApiData } from './data';

const getUser: MockAPIHandler = (req, res, ctx ) => {
  const token = req.headers.get('Authorization');

  if (token?.includes(VALID_ACCESS_TOKEN)) {
    return res(ctx.json(userMockApiData.user))
  }

  return res(ctx.status(401));
}

export const userMockApiHandlers = {
  getUser
}
