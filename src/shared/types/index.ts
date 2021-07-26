import { components } from '@octokit/openapi-types/dist-types/generated/types';

export type PaginationParams = Pick<components['parameters'], 'per_page' | 'page'>;
