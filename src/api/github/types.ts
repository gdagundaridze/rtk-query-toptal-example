import { RequestHeaders } from '@octokit/types/dist-types/RequestHeaders';

declare module '@reduxjs/toolkit/query/react' {
  export interface FetchArgs {
    headers?: RequestHeaders;
  }
}

export interface LinkHeaderEntry {
  page: string;
  per_page: string;
  rel: string;
  sha: string;
  url: string;
}

export interface ResponseWithLink<T> {
  response: T;
  next?: LinkHeaderEntry;
  last?: LinkHeaderEntry;
  prev?: LinkHeaderEntry;
  first?: LinkHeaderEntry;
}
