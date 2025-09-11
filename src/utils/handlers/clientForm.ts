import type { QueryParams } from 'next-intl/navigation';

import type { HeaderDataProps } from '@/types/components/rest-client';

export const headersQueryParams = (headers: HeaderDataProps[]): QueryParams => {
  return headers.reduce<Record<string, string>>((acc, { key, value }) => {
    if (!key || !value) {
      return acc;
    }

    acc[key] = value;
    return acc;
  }, {});
};
