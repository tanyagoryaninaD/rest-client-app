import type {
  Control,
  UseFieldArrayRemove,
  UseFormRegister,
} from 'react-hook-form';

import type { HEADERS } from '@/constants/rest-client';

export interface BodyProps {
  generatedCode: string;
}

export interface GenerateCodeProps {
  generatedCode: string;
  handleGenerateCode: () => void;
  handleCopyCode: () => void;
}

export interface HeaderProps
  extends Pick<UseFormProps, 'register'>,
    Pick<UseFormProps, 'control'> {
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
}

export interface UseFormProps extends Partial<ClientFormStateProps> {
  register: UseFormRegister<ClientFormStateProps>;
  control?: Control<ClientFormStateProps, unknown, ClientFormStateProps>;
}

export interface ClientResponseStateProps {
  status?: number;
  body?: object;
}

export type ResponseBodyProps = Pick<ClientResponseStateProps, 'body'>;
export type StatusCodeProps = Pick<ClientResponseStateProps, 'status'>;
