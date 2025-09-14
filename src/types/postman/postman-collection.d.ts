declare module 'postman-collection' {
  export interface HeaderProps {
    key: string;
    value: string;
  }

  export interface PostmanRequestData
    extends Omit<RequestOptions, 'headers'>,
      Generator {
    headers?: HeaderProps[];
  }

  export interface RequestOptions {
    url: string;
    method: string;
    headers?: HeaderList;
    body?: string | undefined;
  }

  export interface Generator {
    language: string;
    variant: string;
  }

  export type Generators = typeof GENERATORS;
  export type GeneratorsKeys = keyof Generators;
  export type GeneratorsKey<K extends GeneratorsKeys> = Record<
    K,
    Generators[K]
  >;
  export type GeneratorsValues = Generators[GeneratorsKeys];

  export class Request {
    constructor(options: RequestOptions);
    addHeader: (header) => void;
  }

  export class HeaderList {
    constructor();
    add: (header) => void;
  }
}
