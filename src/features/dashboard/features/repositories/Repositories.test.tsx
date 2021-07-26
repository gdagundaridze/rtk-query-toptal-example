import { act, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { store } from '../../../../shared/redux/store';
import { setAuthToken } from '../../../../../test/store/setAuthToken';
import UserMiddleware from '../../../auth/components/UserMiddleware/UserMiddleware';
import Repositories from './Repositories';

const arrange = (path: string) => {
  setAuthToken();

  const history = createMemoryHistory({
    initialEntries: [path]
  });

  render(
    <Provider store={store}>
      <Router history={history}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <UserMiddleware>
            <Repositories />
          </UserMiddleware>
        </QueryParamProvider>
      </Router>
    </Provider>
  );
}

describe('Feature/Repositories', () => {
  it('should render repositories route', async () => {
    act(() => {
      arrange('/repositories');
    });

    expect(await screen.findByText(/repositories/i)).toBeDefined();
  });

  it('should render commits route', async () => {
    act(() => {
      arrange('/repositories/repositoryName');
    });

    expect(await screen.findByText(/commits/i)).toBeDefined();
  });
});

