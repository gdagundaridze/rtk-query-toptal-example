import { endpoint } from '@octokit/endpoint';
import { githubApi } from '../index';
import { ResponseWithLink } from '../types';
import { User } from './types';

export const userApi = githubApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<ResponseWithLink<User>, null>({
      query: () => {
        return endpoint('GET /user');
      },
    }),
  }),
});
