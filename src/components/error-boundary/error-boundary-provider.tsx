'use client';

import { useTranslations } from 'next-intl';

import type { Provider } from '@/types/provider';

import ErrorBoundary from './error-boundary';

export default function ErrorBoundaryProvider(props: Provider) {
  const t = useTranslations('error-boundary');
  const context = {
    title: t('title'),
    description: t('description'),
    button: t('button'),
  };

  return <ErrorBoundary context={context}>{props.children}</ErrorBoundary>;
}
