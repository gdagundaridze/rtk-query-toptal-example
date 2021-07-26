import { DefaultRequestBody, ResponseResolver } from 'msw/lib/types/handlers/RequestHandler';
import { RequestParams, RestContext, RestRequest } from 'msw/lib/types/handlers/RestHandler';

export type MockAPIHandler = ResponseResolver<RestRequest<DefaultRequestBody, RequestParams>, RestContext>;
