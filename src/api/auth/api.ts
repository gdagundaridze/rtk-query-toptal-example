import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthResponse } from './types';

export const AUTH_API_REDUCER_KEY = 'authApi';
export const authApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://tp-github-auth.herokuapp.com',
  }),
  endpoints: (builder) => ({
    getAccessToken: builder.query<AuthResponse, string>({
      query: (code) => {
        return ({
          url: 'github/access_token',
          method: 'POST',
          body: { code }
        })
      },
    }),
  }),
});
