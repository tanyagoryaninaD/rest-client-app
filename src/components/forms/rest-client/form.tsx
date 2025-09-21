'use client';

import { useSearchParams } from 'next/navigation';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';

import RestClientRequest from '@/components/forms/rest-client/request/rest-client-request';
import RestClientResponse from '@/components/forms/rest-client/response/rest-client-response';
import { useAppSelector } from '@/hooks/redux';
import { useProxyFetch } from '@/hooks/use-proxy-fetch';
import { usePathname, useRouter } from '@/i18n/navigation';
import type { ClientFormStateProps } from '@/types/components/rest-client';
import { utf8ToBase64 } from '@/utils/handlers/base64';
import {
  createHeadersObject,
  parseURLtoFormData,
} from '@/utils/handlers/clientForm';
import { parseReplaceVariables } from '@/utils/parse-replace-variables';

export default function FormRestClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { variables } = useAppSelector((state) => state.variables);
  const clientForm = useForm<ClientFormStateProps>({
    mode: 'onChange',
    defaultValues: parseURLtoFormData(pathname, searchParams),
  });
  const { isLoading, responseFetch } = useProxyFetch();

  const onSubmit: SubmitHandler<ClientFormStateProps> = (data): void => {
    const submittedData = {
      ...data,
      url: parseReplaceVariables(data.url, variables),
      body: data.body ? parseReplaceVariables(data.body, variables) : '',
      headers: data.headers.map((item) => ({
        key: parseReplaceVariables(item.key, variables),
        value: parseReplaceVariables(item.value, variables),
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

  return (
    <FormProvider {...clientForm}>
      <form
        className="client-form"
        onSubmit={(e) => void clientForm.handleSubmit(onSubmit)(e)}
        data-testid="form-client"
      >
        <RestClientRequest isLoading={isLoading} />
        <RestClientResponse
          status={responseFetch.status}
          body={responseFetch.body}
        />
      </form>
    </FormProvider>
  );
}
