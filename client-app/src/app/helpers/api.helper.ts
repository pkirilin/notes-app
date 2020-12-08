export type ApiResponse<T> = {
  data?: T;
  errorMessage?: string;
};

export type ApiCallFunction<TData, TPayload> = (
  payload?: TPayload,
) => Promise<ApiResponse<TData>>;

export type UrlModifierFunction<TPayload> = (
  url: string,
  payload: TPayload,
) => string;

export type BodyConstructorFunction<TPayload> = (
  payload: TPayload,
) => ApiCallBody;

export interface ApiCallParameters<TPayload> {
  url: string;
  method?: ApiCallMethod;
  fetchJson?: boolean;
  contentType?: ApiCallContentType;
  failedToFetchMessage?: string;
  modifyUrl?: UrlModifierFunction<TPayload>;
  constructBody?: BodyConstructorFunction<TPayload>;
}

export type ApiCallMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type ApiCallContentType = 'none' | 'application/json';
export type ApiCallBody = string;

type RequestHeadersFragment = Pick<RequestInit, 'headers'>;
type RequestBodyFragment = Pick<RequestInit, 'body'>;

export function createApiCall<TData = unknown, TPayload = unknown>({
  url,
  method = 'GET',
  fetchJson = false,
  contentType = 'application/json',
  failedToFetchMessage = 'Failed to fetch',
  modifyUrl,
  constructBody,
}: ApiCallParameters<TPayload>): ApiCallFunction<TData, TPayload> {
  function getHeaders(): RequestHeadersFragment {
    return contentType === 'none'
      ? {}
      : {
          headers: { 'Content-Type': 'application/json' },
        };
  }

  function getBody(payload?: TPayload): RequestBodyFragment {
    return constructBody && payload ? { body: constructBody(payload) } : {};
  }

  function getUrl(payload?: TPayload): string {
    return modifyUrl && payload ? modifyUrl(url, payload) : url;
  }

  return async payload => {
    try {
      const response = await fetch(getUrl(payload), {
        method,
        ...getHeaders(),
        ...getBody(payload),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        return { errorMessage };
      }

      if (!fetchJson) {
        return { data: {} };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return { errorMessage: failedToFetchMessage };
    }
  };
}
