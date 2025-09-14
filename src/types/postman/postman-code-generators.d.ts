declare module 'postman-code-generators' {
  import type { Request } from 'postman-collection';

  export function convert(
    language: string,
    variant: string,
    request: Request,
    options: Record<string, unknown>,
    callback: (error: Error | null, snippet?: string) => void
  ): void;

  export interface Response {
    code?: string;
    error?: string;
  }
}
