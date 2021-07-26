import isSameDay from 'date-fns/isSameDay';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { repositoryApi } from '../../../../../../../api/github/repository/api';
import { RepositoryCommitsArgs } from '../../../../../../../api/github/repository/types';
import { useTypedDispatch } from '../../../../../../../shared/redux/store';
import { useAuthUser } from '../../../../../../auth/hooks/useAuthUser';
import { AggregatedCommitsData, CommitsRouteParams } from '../types';
import { useCommitsSearchFormContext } from './useCommitsSearchFormContext';

export const useGetRepositoryCommitsArgs = (): RepositoryCommitsArgs => {
  const user = useAuthUser()!;
  const { repositoryName } = useParams<CommitsRouteParams>();
  const { values } = useCommitsSearchFormContext();
  return useMemo<RepositoryCommitsArgs>(() => {
    return {
      owner: user.login,
      repo: repositoryName,
      sha: values.branch,
      page: values.page,
      per_page: 15
    }
  }, [repositoryName, user.login, values]);
}

export const useGetRepositoryCommitsState = () => {
  const queryArgs = useGetRepositoryCommitsArgs();
  return repositoryApi.endpoints.getRepositoryCommits.useQueryState(queryArgs);
}

export const useGetRepositoryCommits = () => {
  const dispatch = useTypedDispatch();
  const queryArgs = useGetRepositoryCommitsArgs();

  useEffect(() => {
    if (!queryArgs.sha) return;

    dispatch(repositoryApi.endpoints.getRepositoryCommits.initiate(queryArgs));
  }, [dispatch, queryArgs]);

  return useGetRepositoryCommitsState();
}

export const useAggregatedRepositoryCommitsData = (): AggregatedCommitsData => {
  const { data: repositoryCommits } = useGetRepositoryCommitsState();
  return useMemo(() => {
    if (!repositoryCommits) return [];

    return repositoryCommits.response.reduce((aggregated, commit) => {
      const existingCommitsGroup = aggregated.find(a => isSameDay(new Date(a.date), new Date(commit.commit.author!.date!)));
      if (existingCommitsGroup) {
        existingCommitsGroup.commits.push(commit);
      } else {
        aggregated.push({
          date: commit.commit.author!.date!,
          commits: [commit]
        })
      }

      return aggregated;
    }, [] as AggregatedCommitsData);
  }, [repositoryCommits]);
}
