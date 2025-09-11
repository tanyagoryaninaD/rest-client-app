'use client';

import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';

import RestClientRequest from '@/components/forms/rest-client/request/rest-client-request';
import RestClientResponse from '@/components/forms/rest-client/response/rest-client-response';
// import { METHODS } from '@/constants/rest-client';
import { usePathname, useRouter } from '@/i18n/navigation';
import type {
  ClientFormStateProps,
  ClientResponseStateProps,
} from '@/types/components/rest-client';
import { utf8ToBase64 } from '@/utils/handlers/base64';

export default function FormRestClient() {
  const { register, handleSubmit, control } = useForm<ClientFormStateProps>();
  const [responseFetch, setResponseFetch] = useState<ClientResponseStateProps>(
    {}
  );

  const pathname = usePathname();
  const router = useRouter();
  // const searchParams = useSearchParams();

  const onSubmit: SubmitHandler<ClientFormStateProps> = (data): void => {
    const basePathnames = pathname.split('/').slice(0, 2);
    basePathnames.push(data.method, utf8ToBase64(data.url));
    const newPathname = basePathnames.join('/');

    if (newPathname !== pathname) {
      router.replace({ pathname: newPathname });
    }

    setResponseFetch({});

    //TODO
    // try {
    //   const url = data.url;
    //   if (typeof url === 'string') {
    //     const response = await fetch(url);
    //     const json = response.json();

    //     json
    //       .then((body) => {
    //         setResponseFetch({
    //           status: response.status,
    //           body: body as object,
    //         });
    //       })
    //       .catch((error: unknown) => {
    //         setResponseFetch({
    //           status: response.status,
    //           body: error as object,
    //         });
    //       });
    //   }
    // } catch {}
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className="client-form" onSubmit={handleSubmit(onSubmit)}>
      <RestClientRequest register={register} control={control} />
      <RestClientResponse
        status={responseFetch.status}
        body={responseFetch.body}
      />
    </form>
  );
}
