'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';

import RestClientRequest from '@/components/forms/rest-client/request/rest-client-request';
import RestClientResponse from '@/components/forms/rest-client/response/rest-client-response';
import { usePathname, useRouter } from '@/i18n/navigation';
import type {
  ClientFormStateProps,
  ClientResponseStateProps,
} from '@/types/components/rest-client';
import { utf8ToBase64 } from '@/utils/handlers/base64';
import {
  headersQueryParams,
  parseURLtoFormData,
} from '@/utils/handlers/clientForm';

export default function FormRestClient() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const clientForm = useForm<ClientFormStateProps>({
    mode: 'onChange',
    defaultValues: parseURLtoFormData(pathname, searchParams),
  });

  const [responseFetch, setResponseFetch] = useState<ClientResponseStateProps>(
    {}
  );

  const onSubmit: SubmitHandler<ClientFormStateProps> = (data): void => {
    const basePathnames = pathname.split('/').slice(0, 2);
    basePathnames.push(data.method, utf8ToBase64(data.url));

    if (data.body) {
      basePathnames.push(utf8ToBase64(data.body));
    }

    const newPathname = basePathnames.join('/');

    if (newPathname !== pathname) {
      router.replace({
        pathname: newPathname,
        query: data.headers.length > 0 ? headersQueryParams(data.headers) : {},
      });
    }

    setResponseFetch({}); // TODO
  };

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
