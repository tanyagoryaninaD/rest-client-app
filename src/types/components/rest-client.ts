import type { UseFieldArrayRemove } from 'react-hook-form';

import type { HEADERS } from '@/constants/rest-client';

export interface GenerateCodeProps extends GenerateCodeResultProps {
  handleGenerateCode: () => void;
  handleCopyCode: () => Promise<void>;
}

export interface GenerateCodeResultProps {
  generatedCode: string;
  isPending: boolean;
}

export interface HeaderProps {
  data: FieldProps;
  index: number;
  headerKeys: HEADERS_KEYS[];
  getOptionsByKey: (key: string) => readonly string[];
  remove: UseFieldArrayRemove;
}

export type HEADERS_KEYS = keyof typeof HEADERS;

export interface FieldProps {
  id: string;
  key: string;
  value: string;
}

export interface HeaderDataProps {
  key: string;
  value: string;
}

export interface ClientFormStateProps {
  method: string;
  url: string;
  headers: HeaderDataProps[];
  body?: string;
  generator?: string;
}

export interface ClientResponseStateProps {
  status?: number;
  body?: object | string;
}

export type ResponseBodyProps = Pick<ClientResponseStateProps, 'body'>;
export type StatusCodeProps = Pick<ClientResponseStateProps, 'status'>;
