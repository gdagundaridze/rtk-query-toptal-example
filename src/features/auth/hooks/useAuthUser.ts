import { userApi } from '../../../api/github/user/api';
import { User } from '../../../api/github/user/types';

export const useAuthUser = (): User | undefined => {
  const state = userApi.endpoints.getUser.useQueryState(null);
  return state.data?.response;
}
