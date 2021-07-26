import '@testing-library/jest-dom/extend-expect';
import { act, configure } from '@testing-library/react';
import 'whatwg-fetch';
import { mockServer } from './mocks/server';
import { resetStateAction } from './shared/redux/actions/resetState';
import { store } from './shared/redux/store';
import { isDebugEnv } from '../test/utils/env';

configure({
  asyncUtilTimeout: isDebugEnv() ? 60000 : 1000
})

beforeAll(async () => {
  mockServer.listen({ onUnhandledRequest: 'warn' });
});

afterEach(() => {
  mockServer.resetHandlers();
  jest.restoreAllMocks();

  act(() => {
    store.dispatch(resetStateAction());
  })
});

afterAll(async () => {
  mockServer.close();
});
