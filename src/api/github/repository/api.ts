import { endpoint } from '@octokit/endpoint';
import { githubApi } from '../index';
import { ResponseWithLink } from '../types';
import { RepositoryBranchesArgs, RepositoryBranchesData, RepositoryCommitsArgs, RepositoryCommitsData, RepositorySearchArgs, RepositorySearchData } from './types';

export const repositoryApi = githubApi.injectEndpoints({
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
  })
});
