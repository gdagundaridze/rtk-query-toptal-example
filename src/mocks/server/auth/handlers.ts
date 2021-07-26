import { nanoid } from '@reduxjs/toolkit';
import { MockAPIHandler } from '../types';
import { VALID_AUTH_CODE } from './constants';

const accessToken: MockAPIHandler = (req, res, ctx ) => {
  const { code } = req.body as { code: string };

  if (code === VALID_AUTH_CODE) {
    return res(ctx.json({
      access_token: nanoid(),
    }))
  }

  return res(ctx.json({
    error: 'error',
    error_description: 'error_description',
    error_uri: 'error_uri',
  }));
}

export const authMockApiHandlers = {
  accessToken
}
