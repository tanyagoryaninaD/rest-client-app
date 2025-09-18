import type { ReadonlyURLSearchParams } from 'next/navigation';
import type { QueryParams } from 'next-intl/navigation';
import { type GeneratorsKeys } from 'postman-collection';

import {
  DEFAULT_GENERATOR,
  GENERATORS,
  METHODS,
} from '@/constants/rest-client';
import type { HeaderDataProps } from '@/types/components/rest-client';

import { base64ToUtf8 } from './base64';

export const headersQueryParams = (headers: HeaderDataProps[]): QueryParams => {
  return headers.reduce<Record<string, string>>((acc, { key, value }) => {
    if (!key || !value) {
      return acc;
    }

    acc[key] = value;
    return acc;
  }, {});
};

export const getGeneratorsOptions = (): string[] => {
  return (Object.keys(GENERATORS) as GeneratorsKeys[]).reduce<string[]>(
    (acc, key) => {
      const values = (GENERATORS as Record<string, readonly string[]>)[
        key.toString()
      ];
      const valuesByKey = values.map((value) => `${key.toString()} - ${value}`);

      acc.push(...valuesByKey);
      return acc;
    },
    []
  );
};

export const getGeneratorLanguage = (generator?: string): string => {
  return generator ? generator.split(' - ')[0] : DEFAULT_GENERATOR.language;
};

export const getGeneratorVariant = (generator?: string): string => {
  return generator ? generator.split(' - ')[1] : DEFAULT_GENERATOR.variant;
};

export const parseURLtoFormData = (
  pathname: string,
  searchParams: ReadonlyURLSearchParams | null
) => {
  const headers = searchParams
    ? Array.from(searchParams.entries()).map(([key, value]) => ({
        key,
        value,
      }))
    : undefined;
  const basePathnames = pathname.split('/').slice(2);
  const [method, url, body] = basePathnames;

  return {
    method: method || METHODS[0],
    url: base64ToUtf8(url),
    body: base64ToUtf8(body),
    headers,
  };
};
