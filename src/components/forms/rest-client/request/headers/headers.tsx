'use client';

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Box, Button, Stack } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { HEADERS } from '@/constants/rest-client';
import type {
  ClientFormStateProps,
  HEADERS_KEYS,
} from '@/types/components/rest-client';

import Header from './header';

export default function Headers() {
  const t = useTranslations('rest-client.request');
  const [isOpen, setIsOpen] = useState(false);
  const headerKeys = Object.keys(HEADERS) as HEADERS_KEYS[];
  const { control } = useFormContext<ClientFormStateProps>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'headers',
  });

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      if (!fields.length) {
        handleAddHeader();
      }

      setIsOpen(true);
    }
  };

  const handleAddHeader = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
    append({ key: '', value: '' });
  };

  const getOptionsByKey = (key: string): readonly string[] => {
    if (key in HEADERS) {
      return HEADERS[key as HEADERS_KEYS];
    }

    return [];
  };

  return (
    <Stack direction={'column'} spacing={2}>
      <Box>
        <Button onClick={handleToggle}>{t('buttons.headers')}</Button>
        {isOpen && (
          <Button onClick={handleAddHeader} sx={{ minWidth: '1rem' }}>
            <ControlPointIcon />
          </Button>
        )}
      </Box>
      {isOpen && !!fields.length && (
        <Stack direction={'column'} spacing={1}>
          {fields.map((field, index) => {
            return (
              <Header
                key={field.id}
                headerKeys={headerKeys}
                getOptionsByKey={getOptionsByKey}
                data={field}
                index={index}
                remove={() => {
                  if (fields.length === 1) {
                    handleToggle();
                  }

                  remove(index);
                }}
              />
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}
