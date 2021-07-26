import { act, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { INVALID_AUTH_CODE, VALID_AUTH_CODE } from '../../../../mocks/server/auth/constants';
import { authMockApiHandlers } from '../../../../mocks/server/auth/handlers';
import { store } from '../../../../shared/redux/store';
import OAuth from './OAuth';

const arrange = (path: History.Path) => {
  const apiSpy = jest.spyOn(authMockApiHandlers, 'accessToken');
  const history = createMemoryHistory({
    initialEntries: [path]
  });

  render(
    <Provider store={store}>
      <Router history={history}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <OAuth />
        </QueryParamProvider>
      </Router>
    </Provider>
  );

  return { apiSpy, history };
}

describe('Route/OAuth', () => {
  it('should not call API and redirect to login', async () => {
    await act(async () => {
      const { apiSpy, history } = arrange('/oauth');

      await waitFor(() => {
        expect(history.location.pathname).toBe('/login');
        expect(apiSpy).not.toHaveBeenCalled();
      });
    });
  });

  it('should call API and display error', async () => {
    await act(async () => {
      const { apiSpy } = arrange(`/oauth?code=${INVALID_AUTH_CODE}`);

      await waitFor(() => {
        const errorMessage = screen.getByText(/error/i);
        expect(apiSpy).toHaveBeenCalledTimes(1);
        expect(errorMessage).toBeDefined();
      });
    });
  });

  it('should call API and redirect to dashboard', async () => {
    await act(async () => {
      const { apiSpy } = arrange(`/oauth?code=${VALID_AUTH_CODE}`);

      await waitFor(() => {
        expect(apiSpy).toHaveBeenCalledTimes(1);
        expect(store.getState().authSlice.accessToken).toBeDefined();
      });
    });
  });
});


