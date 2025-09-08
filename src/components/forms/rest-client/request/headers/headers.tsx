'use client';

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { Box, Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { HEADERS } from '@/constants/rest-client';
import type {
  HeaderDataProps,
  HEADERS_KEYS,
  UpdateHeaderDataProps,
} from '@/types/components/rest-client';

import Header from './header';

export default function Headers() {
  const t = useTranslations('rest-client.request');
  const [isOpen, setIsOpen] = useState(false);
  const [headers, setHeaders] = useState<HeaderDataProps[]>([]);
  const headerKeys = Object.keys(HEADERS) as HEADERS_KEYS[];

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      if (!headers.length) {
        addNewHeader();
      }

      setIsOpen(true);
    }
  };

  const handleUpdate = (data: UpdateHeaderDataProps) => {
    setHeaders((prev) =>
      prev.map((header) =>
        header.id === data.id
          ? {
              ...header,
              ...(data.key !== undefined && { key: data.key }),
              ...(data.value !== undefined && {
                value: data.value,
              }),
            }
          : header
      )
    );
  };

  const handleRemoveHeader = (id: number) => {
    setHeaders((prev) => {
      const newHeaders = prev.filter((item) => item.id !== id);

      if (newHeaders.length === 0) {
        setIsOpen(false);
      }

      return newHeaders;
    });
  };

  const addNewHeader = () => {
    setHeaders((prev) => [...prev, { id: Date.now(), key: '', value: '' }]);
  };

  const handleAddHeader = () => {
    if (!isOpen) {
      setIsOpen(true);
    }

    addNewHeader();
  };

  const getKeyValues = (key: string): readonly string[] => {
    if (key in HEADERS) {
      return HEADERS[key as HEADERS_KEYS];
    }

    return [];
  };

  return (
    <Box className="client-box" sx={{ flexDirection: 'column' }}>
      <Box>
        <Button onClick={handleToggle}>{t('buttons.headers')}</Button>
        {isOpen && (
          <Button onClick={handleAddHeader} sx={{ minWidth: '1rem' }}>
            <ControlPointIcon />
          </Button>
        )}
      </Box>
      {isOpen && !!headers.length && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {headers.map((header) => (
            <Header
              key={header.id}
              headerKeys={headerKeys}
              getKeyValues={getKeyValues}
              data={header}
              handleUpdate={handleUpdate}
              handleRemoveHeader={handleRemoveHeader}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
