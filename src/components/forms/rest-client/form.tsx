'use client';

import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import RestClientRequest from '@/components/forms/rest-client/request/rest-client-request';
import RestClientResponse from '@/components/forms/rest-client/response/rest-client-response';
import type {
  ClientFormStateProps,
  ClientResponseStateProps,
} from '@/types/components/rest-client';

export default function FormRestClient() {
  const { register, handleSubmit } = useForm<ClientFormStateProps>();
  const [responseFetch, setResponseFetch] = useState<ClientResponseStateProps>(
    {}
  );

  const onSubmit: SubmitHandler<ClientFormStateProps> = async (
    data
  ): Promise<void> => {
    //TODO
    try {
      const url = data.url;
      if (typeof url === 'string') {
        const response = await fetch(url);
        const json = response.json();

        json
          .then((body) => {
            setResponseFetch({
              status: response.status,
              body: body as object,
            });
          })
          .catch((error: unknown) => {
            setResponseFetch({
              status: response.status,
              body: error as object,
            });
          });
      }
    } catch {}
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className="client-form" onSubmit={handleSubmit(onSubmit)}>
      <RestClientRequest register={register} />
      <RestClientResponse
        status={responseFetch.status}
        body={responseFetch.body}
      />
    </form>
  );
}
