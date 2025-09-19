export interface ProxyRequestPayload {
  url: string;
  method: string;
  headers: Record<string, string>;
  body?: string;
  pathNameRequest: string;
}
