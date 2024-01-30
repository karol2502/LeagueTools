import { invoke } from '@tauri-apps/api';
import { InvokeArgs } from '@tauri-apps/api/tauri';

type HttpMethod = 'GET' | 'POST' | 'PUT';

interface SendHttpRequestProps extends InvokeArgs {
  url: string;
  method: HttpMethod;
  token: string;
  body?: string;
}

interface Response {
  data: string;
  status: number;
}

interface ParsedResponse {
  data: Record<string, string>;
  status: number;
}

const invokeSendHttpRequest = (method: HttpMethod) => {
  return async (url: string, token: string, body?: object) => {
    return await invoke<string>('send_http_request', {
      url,
      method,
      token,
      body: JSON.stringify(body),
    } as SendHttpRequestProps).then((response) => {
      const parsed: Response = JSON.parse(response);
      return {
        ...parsed,
        data: JSON.parse(parsed.data ?? '{}'),
      } as ParsedResponse;
    });
  };
};

export const TauriHttpClient = {
  get: invokeSendHttpRequest('GET'),
  post: invokeSendHttpRequest('POST'),
  put: invokeSendHttpRequest('PUT'),
};
