import { components, operations } from '@octokit/openapi-types/dist-types/generated/types';
import { Endpoints } from '@octokit/types';

export type Repository = components['schemas']['repo-search-result-item'];

export type RepositorySearchData = Endpoints['GET /search/repositories']['response']['data'];
export type RepositorySearchArgs = operations['search/repos']['parameters']['query'];
