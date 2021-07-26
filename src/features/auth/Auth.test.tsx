import { act, render, screen } from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { store } from '../../shared/redux/store';
import Auth from './Auth';

const arrange = (path: History.Path) => {
  const history = createMemoryHistory({
    initialEntries: [path]
  });
  const renderResult = render(
    <Provider store={store}>
      <Router history={history}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <Auth />
        </QueryParamProvider>
      </Router>
    </Provider>
  );

  return { renderResult, history };
}

describe('Feature/Auth', () => {
  it('should render nothing', async () => {
    act(() => {
      const { renderResult: { container } } = arrange('/');
      expect(container.innerHTML).toBe('');
    });
  });

  it('should render Login page', async () => {
    act(() => {
      arrange('/login');
    });

    const githubLoginLink = screen.getByRole('link', { name: /login/i});
    expect(githubLoginLink).toBeDefined();
  });

  it('should render OAuth page', async () => {
    act(() => {
      arrange('/oauth?code=code');
    });

    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toBeDefined();
  });
});


