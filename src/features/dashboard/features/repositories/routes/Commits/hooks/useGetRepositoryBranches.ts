import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { repositoryApi } from '../../../../../../../api/github/repository/api';
import { RepositoryBranchesArgs } from '../../../../../../../api/github/repository/types';
import { useTypedDispatch } from '../../../../../../../shared/redux/store';
import { useAuthUser } from '../../../../../../auth/hooks/useAuthUser';
import { CommitsRouteParams } from '../types';

export const useGetRepositoryBranchesArgs = (): RepositoryBranchesArgs => {
  const user = useAuthUser()!;
  const { repositoryName } = useParams<CommitsRouteParams>();
  return useMemo<RepositoryBranchesArgs>(() => {
    return {
      owner: user.login,
      repo: repositoryName,
    }
  }, [repositoryName, user.login]);
}

export const useGetRepositoryBranchesState = () => {
  const queryArgs = useGetRepositoryBranchesArgs();
  return repositoryApi.endpoints.getRepositoryBranches.useQueryState(queryArgs);
}

export const useGetRepositoryBranches = () => {
  const dispatch = useTypedDispatch();
  const queryArgs = useGetRepositoryBranchesArgs();

  useEffect(() => {
    dispatch(repositoryApi.endpoints.getRepositoryBranches.initiate(queryArgs));
  }, [dispatch, queryArgs]);

  return useGetRepositoryBranchesState();
}
