import { authSlice } from '../../src/features/auth/slice';
import { INVALID_ACCESS_TOKEN, VALID_ACCESS_TOKEN } from '../../src/mocks/server/github/user/constants';
import { store } from '../../src/shared/redux/store';

export const setAuthToken = (valid: boolean = true) => {
  store.dispatch(authSlice.actions.updateAccessToken(valid ? VALID_ACCESS_TOKEN : INVALID_ACCESS_TOKEN));
}
