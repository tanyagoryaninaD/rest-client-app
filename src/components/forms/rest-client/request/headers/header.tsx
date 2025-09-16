'use client';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Autocomplete, Button, Stack, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import type {
  ClientFormStateProps,
  HeaderProps,
} from '@/types/components/rest-client';

export default function Header(props: HeaderProps) {
  const t = useTranslations('rest-client.request');
  const { headerKeys, getOptionsByKey, remove, data, index } = props;
  const { control } = useFormContext<ClientFormStateProps>();
  const [options, setOptions] = useState(getOptionsByKey(data.key));

  return (
    <Stack alignItems={'center'} spacing={2} direction={'row'}>
      <Stack spacing={2} direction={'row'} width={'100%'} margin={'auto'}>
        <Controller
          name={`headers.${index}.key`}
          control={control}
          defaultValue={data.key || ''}
          render={({ field }) => (
            <Autocomplete
              options={headerKeys}
              freeSolo
              value={field.value}
              data-testid="request-header-key"
              onInputChange={(_, value) => {
                field.onChange(value);
                setOptions(getOptionsByKey(value));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('labels.key')}
                  sx={{ minWidth: '15rem', width: 'max-content' }}
                />
              )}
            />
          )}
        />
        <Stack width={'100%'}>
          <Controller
            name={`headers.${index}.value`}
            control={control}
            defaultValue={data.value || ''}
            render={({ field }) => (
              <Autocomplete
                sx={{ width: '100%' }}
                options={options}
                freeSolo
                value={field.value}
                data-testid="request-header-value"
                onInputChange={(_, value) => {
                  field.onChange(value);
                }}
                renderInput={(params) => (
                  <TextField {...params} label={t('labels.value')} />
                )}
              />
            )}
          />
        </Stack>
      </Stack>
      <Stack>
        <Button
          onClick={() => {
            remove();
          }}
          sx={{
            minWidth: '1rem',
            height: 'min-content',
          }}
        >
          <HighlightOffIcon />
        </Button>
      </Stack>
    </Stack>
  );
}
