import { act, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { store } from '../../../../shared/redux/store';
import { setAuthToken } from '../../../../../test/store/setAuthToken';
import UserMiddleware from '../UserMiddleware/UserMiddleware';
import AuthenticatedRoute, { AuthenticatedRouteProps } from './AuthenticatedRoute';

const arrange = (props: AuthenticatedRouteProps = {}) => {
  const route = '/test';
  const history = createMemoryHistory({
    initialEntries: [route]
  });

  render(
    <Provider store={store}>
      <Router history={history}>
        <UserMiddleware>
          <AuthenticatedRoute exact path={route} {...props}>
            TEST
          </AuthenticatedRoute>
        </UserMiddleware>
      </Router>
    </Provider>
  );

  return { history };
}

describe('Component/AuthenticatedRoute', () => {
  it('should redirect to login', async () => {
    await act(async () => {
      const { history } = arrange();

      await waitFor(() => {
        expect(history.location.pathname).toBe('/login');
      })
    });
  });

  it('should render auth route content', async () => {
    act(() => {
      setAuthToken();
      arrange();
    });

    const content = await screen.findByText(/test/i);
    expect(content).toBeDefined();
  });

  it('should redirect to dashboard', async () => {
    await act(async () => {
      setAuthToken();
      const { history } = arrange({
        onlyPublic: true
      });

      await waitFor(() => {
        expect(history.location.pathname).toBe('/');
      })
    });
  });


  it('should render public route content', async () => {
    act(() => {
      arrange({
        onlyPublic: true
      })
    });

    const content = await screen.findByText(/test/i);
    expect(content).toBeDefined();
  });
});


