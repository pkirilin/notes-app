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

export interface ApiCallParameters<TPayload, TBody> {
  url: string;
  fetchJson?: boolean;
  contentType?: ApiCallContentType;
  body?: TBody;
  failedToFetchMessage?: string;
  modifyUrl?: UrlModifierFunction<TPayload>;
}

export type ApiCallContentType = 'none' | 'application/json';
export type ApiCallBody = string;

type RequestHeadersFragment = Pick<RequestInit, 'headers'>;
type RequestBodyFragment = Pick<RequestInit, 'body'>;

export function createApiCall<
  TData = unknown,
  TPayload = unknown,
  TBody = unknown
>({
  url,
  fetchJson = false,
  contentType = 'application/json',
  body,
  failedToFetchMessage = 'Failed to fetch',
  modifyUrl,
}: ApiCallParameters<TPayload, TBody>): ApiCallFunction<TData, TPayload> {
  function getHeaders(): RequestHeadersFragment {
    return contentType === 'none'
      ? {}
      : {
          headers: { 'Content-Type': 'application/json' },
        };
  }

  function getBody(): RequestBodyFragment {
    return body ? { body: JSON.stringify(body) } : {};
  }

  function getUrl(payload?: TPayload): string {
    return modifyUrl && payload ? modifyUrl(url, payload) : url;
  }

  return async payload => {
    try {
      const response = await fetch(getUrl(payload), {
        ...getHeaders(),
        ...getBody(),
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
