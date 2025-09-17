'use client';

import { Stack } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import type { Response } from 'postman-code-generators';
import { useState, useTransition } from 'react';
import { useFormContext } from 'react-hook-form';

import { useAppSelector } from '@/hooks/redux';
import type {
  ClientFormStateProps,
  HeaderDataProps,
} from '@/types/components/rest-client';
import {
  getGeneratorLanguage,
  getGeneratorVariant,
} from '@/utils/handlers/clientForm';
import { parseReplaceVariables } from '@/utils/parse-replace-variables';

import GenerateCodeButtons from './buttons';
import GenerateCodeResult from './result';

export default function GenerateCode() {
  const t = useTranslations('rest-client');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const { watch } = useFormContext<ClientFormStateProps>();
  const locale = useLocale();
  const { variables } = useAppSelector((state) => state.variables);

  const handleGenerateCode = () => {
    startTransition(async () => {
      try {
        const response = await fetch(`/${locale}/api/postman-code-generators`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            method: parseReplaceVariables(watch('method'), variables),
            url: parseReplaceVariables(watch('url'), variables),
            headers: watch('headers').map((item: HeaderDataProps) => ({
              key: parseReplaceVariables(item.key, variables),
              value: parseReplaceVariables(item.value, variables),
            })),
            body: watch('body')
              ? parseReplaceVariables(watch('body') ?? '', variables)
              : '',
            language: getGeneratorLanguage(watch('generator')),
            variant: getGeneratorVariant(watch('generator')),
          }),
        });

        const data = (await response.json()) as Response;

        if (data.error) {
          throw Error(data.error);
        }

        if (data.code) {
          setGeneratedCode(data.code.replace(/\\n/g, '\n'));
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setGeneratedCode(t(`errors.generator.${error.message}`));
        }
      }
    });
  };

  const handleCopyCode = async () => {
    if (!generatedCode) {
      return;
    }

    await window.navigator.clipboard.writeText(generatedCode);
  };

  return (
    <Stack spacing={2}>
      <GenerateCodeButtons
        handleGenerateCode={handleGenerateCode}
        handleCopyCode={handleCopyCode}
        generatedCode={generatedCode}
        isPending={isPending}
      />
      {generatedCode && (
        <GenerateCodeResult
          generatedCode={generatedCode}
          isPending={isPending}
        />
      )}
    </Stack>
  );
}
