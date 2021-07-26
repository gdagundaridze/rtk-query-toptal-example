import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo } from 'react';
import urltemplate from 'url-template';
import { repositoryApi } from '../../../../../../../api/github/repository/api';
import { RepositorySearchArgs } from '../../../../../../../api/github/repository/types';
import { useTypedDispatch } from '../../../../../../../shared/redux/store';
import { useAuthUser } from '../../../../../../auth/hooks/useAuthUser';
import { useRepositorySearchFormContext } from './useRepositorySearchFormContext';

const searchQs = urltemplate.parse('user:{user} {name} {visibility}');
export const useSearchRepositoriesArgs = (): RepositorySearchArgs => {
  const user = useAuthUser()!;
  const { values } = useRepositorySearchFormContext();
  return useMemo<RepositorySearchArgs>(() => {
    return {
      q: decodeURIComponent(
        searchQs.expand({
          user: user.login,
          name: values.name && `${values.name} in:name`,
          visibility: ['is:public', 'is:private'][values.type] ?? '',
        })
      ).trim(),
      sort: values.sort,
      per_page: values.per_page,
      page: values.page,
    }
  }, [values, user.login]);
}

export const useSearchRepositoriesState = () => {
  const searchArgs = useSearchRepositoriesArgs();
  return repositoryApi.endpoints.searchRepositories.useQueryState(searchArgs);
}

export const useSearchRepositories = () => {
  const dispatch = useTypedDispatch();
  const searchArgs = useSearchRepositoriesArgs();
  const repositorySearchFn = useCallback((args: typeof searchArgs) => {
    dispatch(repositoryApi.endpoints.searchRepositories.initiate(args));
  }, [dispatch]);
  const debouncedRepositorySearchFn = useMemo( () => debounce((args: typeof searchArgs) => {
      repositorySearchFn(args);
    }, 100),
    [repositorySearchFn]
  );

  useEffect(() => {
    repositorySearchFn(searchArgs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    debouncedRepositorySearchFn(searchArgs);
  }, [searchArgs, debouncedRepositorySearchFn]);

  return useSearchRepositoriesState();
}
