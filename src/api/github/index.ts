import { RequestOptions } from '@octokit/types/dist-types/RequestOptions';
import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError } from 'axios';
import { omit } from 'lodash';
import { RootState } from '../../shared/redux/store';
import { wrapResponseWithLink } from './utils';

const githubAxiosInstance = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    accept: `application/vnd.github.v3+json`
  }
})

const axiosBaseQuery = (): BaseQueryFn<RequestOptions> => async (requestOpts, { getState }) => {
  try {
    const token = (getState() as RootState).authSlice.accessToken;
    const result = await githubAxiosInstance({
      ...requestOpts,
      headers: {
        ...(omit(requestOpts.headers, ['user-agent'])),
        Authorization: `Bearer ${token}`
      }
    });

    return { data: wrapResponseWithLink(result.data, result.headers.link) };
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    return { error: { status: err.response?.status, data: err.response?.data } };
  }
};

export const GITHUB_API_REDUCER_KEY = 'githubApi';
export const githubApi = createApi({
  reducerPath: GITHUB_API_REDUCER_KEY,
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
  refetchOnMountOrArgChange: 60
});
