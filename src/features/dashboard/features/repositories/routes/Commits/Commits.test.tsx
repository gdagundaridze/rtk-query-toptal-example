import { act, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { store } from '../../../../../../shared/redux/store';
import { setAuthToken } from '../../../../../../../test/store/setAuthToken';
import AuthenticatedRoute from '../../../../../auth/components/AuthenticatedRoute/AuthenticatedRoute';
import UserMiddleware from '../../../../../auth/components/UserMiddleware/UserMiddleware';
import Commits from './Commits';

export const arrangeCommitsRoute = () => {
  const history = createMemoryHistory({
    initialEntries: ['/repositories/repositoryName']
  });
  setAuthToken();

  render(
    <Provider store={store}>
      <Router history={history}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <UserMiddleware>
            <AuthenticatedRoute exact path="/repositories/:repositoryName">
              <Commits />
            </AuthenticatedRoute>
          </UserMiddleware>
        </QueryParamProvider>
      </Router>
    </Provider>
  );
}

describe('Route/Commits', () => {
  it('should render page title', async () => {
    act(() => {
      arrangeCommitsRoute();
    })
    expect(await screen.findByText(/commits/i)).toBeDefined();
  });
});

