import type { HEADERS } from '@/constants/rest-client';

export interface BodyProps {
  generatedCode: string;
}

export interface GenerateCodeProps {
  generatedCode: string;
  handleGenerateCode: () => void;
  handleCopyCode: () => void;
}

export interface HeaderProps {
  data: HeaderDataProps;
  headerKeys: HEADERS_KEYS[];
  getKeyValues: (key: string) => readonly string[];
  handleUpdate: (data: UpdateHeaderDataProps) => void;
  handleRemoveHeader: (id: number) => void;
}

export type HEADERS_KEYS = keyof typeof HEADERS;

export interface HeaderDataProps {
  id: number;
  key: string;
  value: string;
}
export interface UpdateHeaderDataProps {
  id: number;
  key?: string;
  value?: string;
}
