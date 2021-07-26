import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { store } from '../../../../../../shared/redux/store';
import { setAuthToken } from '../../../../../../../test/store/setAuthToken';
import UserMiddleware from '../../../../../auth/components/UserMiddleware/UserMiddleware';
import Repositories from './Repositories';

export const arrangeRepositoryRoute = () => {
  setAuthToken();

  render(
    <Provider store={store}>
      <MemoryRouter>
        <UserMiddleware>
          <Repositories />
        </UserMiddleware>
      </MemoryRouter>
    </Provider>
  );
}

describe('Route/Repositories', () => {
  it('should render page title', async () => {
    act(() => {
      arrangeRepositoryRoute();
    })
    expect(await screen.findByText(/repositories/i)).toBeDefined();
  });
});

