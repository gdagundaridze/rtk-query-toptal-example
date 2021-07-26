import { endpoint } from '@octokit/endpoint';
import { createApi } from '@reduxjs/toolkit/query/react';
import { githubBaseQuery } from '../index';
import { ResponseWithLink } from '../types';
import { RepositorySearchArgs, RepositorySearchData } from './types';

export const REPOSITORY_API_REDUCER_KEY = 'repositoryApi';
export const repositoryApi = createApi({
  reducerPath: REPOSITORY_API_REDUCER_KEY,
  baseQuery: githubBaseQuery,
  endpoints: (builder) => ({
    searchRepositories: builder.query<ResponseWithLink<RepositorySearchData>, RepositorySearchArgs>({
      query: (args) => {
        return endpoint('GET /search/repositories', args);
      },
    }),
  }),
  refetchOnMountOrArgChange: 60
});
