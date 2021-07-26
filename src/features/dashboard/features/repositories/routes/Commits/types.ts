import { RepositoryCommitsData } from '../../../../../../api/github/repository/types';
import { PaginationParams } from '../../../../../../shared/types';

export type CommitsSearchFormValues = {
  branch: string;
} & Omit<PaginationParams, 'per_page'>;

export interface CommitsRouteParams {
  repositoryName: string;
}

export interface AggregatedCommitsEntry {
  date: string;
  commits: RepositoryCommitsData;
}

export type AggregatedCommitsData = AggregatedCommitsEntry[];
