import { Endpoints } from '@octokit/types';

export type User = Endpoints['GET /user']['response']['data'];
