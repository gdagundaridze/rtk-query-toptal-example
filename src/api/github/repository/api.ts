import { endpoint } from '@octokit/endpoint';
import { createApi } from '@reduxjs/toolkit/query/react';
import { githubBaseQuery } from '../index';
import { ResponseWithLink } from '../types';
import {
  RepositoryBranchesArgs,
  RepositoryBranchesData,
  RepositoryCommitsArgs,
  RepositoryCommitsData,
  RepositorySearchArgs,
  RepositorySearchData
} from './types';

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
    getRepositoryBranches: builder.query<ResponseWithLink<RepositoryBranchesData>, RepositoryBranchesArgs>({
      query(args) {
        return endpoint('GET /repos/{owner}/{repo}/branches', args)
      }
    }),
    getRepositoryCommits: builder.query<ResponseWithLink<RepositoryCommitsData>, RepositoryCommitsArgs>({
      query(args) {
        return endpoint('GET /repos/{owner}/{repo}/commits', args);
      },
    }),
  }),
  refetchOnMountOrArgChange: 60
});
