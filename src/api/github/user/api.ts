import { endpoint } from '@octokit/endpoint';
import { createApi } from '@reduxjs/toolkit/query/react';
import { githubBaseQuery } from '../index';
import { ResponseWithLink } from '../types';
import { User } from './types';

export const USER_API_REDUCER_KEY = 'userApi';
export const userApi = createApi({
  reducerPath: USER_API_REDUCER_KEY,
  baseQuery: githubBaseQuery,
  endpoints: (builder) => ({
    getUser: builder.query<ResponseWithLink<User>, null>({
      query: () => {
        return endpoint('GET /user');
      },
    }),
  }),
});
