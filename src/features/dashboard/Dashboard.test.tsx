import { act, render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { store } from '../../shared/redux/store';
import { setAuthToken } from '../../../test/store/setAuthToken';
import UserMiddleware from '../auth/components/UserMiddleware/UserMiddleware';
import Dashboard from './Dashboard';

describe('Feature/Dashboard', () => {
  it('should redirect to repositories', async () => {
    const history = createMemoryHistory({
      initialEntries: ['/']
    });
    setAuthToken();

    act(() => {
      render(
        <Provider store={store}>
          <Router history={history}>
            <UserMiddleware>
              <Dashboard />
            </UserMiddleware>
          </Router>
        </Provider>
      );
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/repositories');
    });
  });
});

