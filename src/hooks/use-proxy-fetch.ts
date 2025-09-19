import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useTransition } from 'react';
import { toast } from 'react-toastify';

import { REQUEST_ABORTED } from '@/constants/app';
import { usePathname } from '@/i18n/navigation';
import type { ClientResponseStateProps } from '@/types/components/rest-client';
import type { ProxyRequestPayload } from '@/types/proxy';
import {
  createHeadersObject,
  parseURLtoFormData,
} from '@/utils/handlers/clientForm';
import {
  ClientErrorBodySchema,
  SuccessResponseSchema,
} from '@/zod/response-schema';

export function useProxyFetch() {
  const t = useTranslations('rest-client.errors');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, startTransition] = useTransition();
  const [responseFetch, setResponseFetch] = useState<ClientResponseStateProps>(
    {}
  );

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const { url, method, body, headers } = parseURLtoFormData(
      pathname,
      searchParams
    );

    if (!url || !method) {
      return;
    }

    const fetchData = async () => {
      setResponseFetch({});

      const headersObject = createHeadersObject(headers ?? []);
      const pathNameRequest = `${pathname.split('/').slice(2).join('/')}?${new URLSearchParams(headersObject)}`;

      const payload: ProxyRequestPayload = {
        url,
        method,
        body,
        headers: headersObject,
        pathNameRequest,
      };

      try {
        const response = await fetch('/api/proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal,
        });

        if (!response.ok) {
          toast.error(t('unknown_proxy'));
          return;
        }

        const responseJSON: unknown = await response.json();

        const clientErrorParsed = ClientErrorBodySchema.safeParse(responseJSON);
        if (clientErrorParsed.success) {
          toast.error(t(`errors.${clientErrorParsed.data.clientError}`));
          return;
        }

        const successResponseParsed =
          SuccessResponseSchema.safeParse(responseJSON);
        if (successResponseParsed.success) {
          const { responseBody, responseStatus } = successResponseParsed.data;

          if (responseStatus === 0) {
            toast.error(t('api'));
          }

          let body: unknown;
          try {
            body = JSON.parse(responseBody);
          } catch {
            body = responseBody;
          }

          setResponseFetch({
            body: body as object | string,
            status: responseStatus,
          });
        }
      } catch (error) {
        if (error !== REQUEST_ABORTED) {
          const errorMessage =
            error instanceof Error ? error.message : t('network');
          toast.error(errorMessage);
        }
      }
    };

    startTransition(() => void fetchData());

    return () => {
      controller.abort(REQUEST_ABORTED);
    };
  }, [pathname, searchParams, t]);

  return { responseFetch, isLoading };
}
