'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import RestClientRequest from '@/components/forms/rest-client/request/rest-client-request';
import RestClientResponse from '@/components/forms/rest-client/response/rest-client-response';
import Loader from '@/components/layout/loader/loader';
import { REQUEST_ABORTED } from '@/constants/app';
import { CLIENT_PROXY_ERRORS } from '@/constants/client-proxy-errors';
import { useAppSelector } from '@/hooks/redux';
import { usePathname, useRouter } from '@/i18n/navigation';
import type {
  ClientFormStateProps,
  ClientResponseStateProps,
} from '@/types/components/rest-client';
import { changeVariables } from '@/utils/change-variable-in-field';
import { utf8ToBase64 } from '@/utils/handlers/base64';
import {
  createHeadersObject,
  parseURLtoFormData,
} from '@/utils/handlers/clientForm';

export default function FormRestClient() {
  const t = useTranslations('rest-client');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { variables } = useAppSelector((state) => state.variables);
  const clientForm = useForm<ClientFormStateProps>({
    mode: 'onChange',
    defaultValues: parseURLtoFormData(pathname, searchParams),
  });
  const [responseFetch, setResponseFetch] = useState<ClientResponseStateProps>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      const formData = parseURLtoFormData(pathname, searchParams);

      if (!formData.url || !formData.method) {
        return;
      }
      setIsLoading(true);

      const headersObject = createHeadersObject(formData.headers);
      const pathNameRequest = `${pathname.split('/').slice(2).join('/')}?${new URLSearchParams(headersObject)}`;

      try {
        const response = await fetch('/api/proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: formData.url,
            method: formData.method,
            headers: headersObject,
            body: formData.body,
            pathNameRequest: pathNameRequest,
          }),
          signal: controller.signal,
        });

        const responseBodyText = await response.text();

        if (!response.ok) {
          let errorData = { error: t('errors.unknown_proxy') };

          try {
            errorData = JSON.parse(responseBodyText) as { error: string };
          } catch {
            errorData = { error: responseBodyText };
          }

          if (CLIENT_PROXY_ERRORS.includes(errorData.error)) {
            toast.error(
              t('errors.proxy', {
                status: response.status,
                error: t(`errors.${errorData.error}`),
              })
            );
          } else {
            toast.error(t('errors.api'));
          }

          setResponseFetch({
            status: response.status,
            body: errorData,
          });
          return;
        }

        let finalBody: unknown = responseBodyText;
        try {
          finalBody = JSON.parse(responseBodyText);
        } catch {}

        setResponseFetch({
          status: response.status,
          body: finalBody as object | string,
        });
      } catch (error) {
        if (error === REQUEST_ABORTED) {
          return;
        }

        const errorMessage =
          error instanceof Error ? error.message : t('errors.network');

        toast.error(errorMessage);

        setResponseFetch({
          status: 500,
          body: { error: errorMessage },
        });
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();

    return () => {
      controller.abort(REQUEST_ABORTED);
    };
  }, [pathname, searchParams, t]);

  const onSubmit: SubmitHandler<ClientFormStateProps> = (data): void => {
    const submittedData = {
      ...data,
      url: changeVariables(data.url, variables),
      body: data.body ? changeVariables(data.body, variables) : '',
      headers: data.headers.map((item) => ({
        key: changeVariables(item.key, variables),
        value: changeVariables(item.value, variables),
      })),
    };

    const basePathnames = pathname.split('/').slice(0, 2);
    basePathnames.push(submittedData.method, utf8ToBase64(submittedData.url));

    if (submittedData.body) {
      basePathnames.push(utf8ToBase64(submittedData.body));
    }

    const newPathname = basePathnames.join('/');
    router.replace({
      pathname: newPathname,
      query:
        submittedData.headers.length > 0
          ? createHeadersObject(submittedData.headers)
          : {},
    });
  };

  // TODO: pass isLoading to children instead?
  if (isLoading) {
    return <Loader />;
  }

  return (
    <FormProvider {...clientForm}>
      <form
        className="client-form"
        onSubmit={(e) => void clientForm.handleSubmit(onSubmit)(e)}
        data-testid="form-client"
      >
        <RestClientRequest />
        <RestClientResponse
          status={responseFetch.status}
          body={responseFetch.body}
        />
      </form>
    </FormProvider>
  );
}
