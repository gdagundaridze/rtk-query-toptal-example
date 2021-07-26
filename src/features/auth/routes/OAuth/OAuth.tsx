import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import { StringParam, useQueryParam } from 'use-query-params';
import { authApi } from '../../../../api/auth/api';
import FullscreenProgress from '../../../../shared/components/FullscreenProgress/FullscreenProgress';
import { useTypedDispatch } from '../../../../shared/redux/store';
import { authSlice } from '../../slice';

const OAuth = () => {
  const dispatch =  useTypedDispatch();
  const [code] = useQueryParam('code', StringParam);
  const accessTokenQueryResult = authApi.endpoints.getAccessToken.useQuery(code!, {
    skip: !code
  });
  const { data } = accessTokenQueryResult;
  const accessToken = data?.access_token;

  useEffect(() => {
    if (!accessToken) return;

    dispatch(authSlice.actions.updateAccessToken(accessToken));
  }, [dispatch, accessToken]);

  if (!code) {
    return <Redirect to="/login" />;
  }

  if (data?.error) {
    return (
      <>
        Error: {data.error}
      </>
    );
  }

  return (
    <FullscreenProgress />
  );
}

export default OAuth;
