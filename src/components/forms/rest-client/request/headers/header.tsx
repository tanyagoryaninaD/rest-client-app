'use client';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  InputLabel,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

import type { HeaderProps } from '@/types/components/rest-client';

export default function Header(props: HeaderProps) {
  const t = useTranslations('rest-client.request');
  const { headerKeys, getOptionsByKey, control, remove, data, index } = props;
  const [options, setOptions] = useState(getOptionsByKey(data.key));

  return (
    <Stack alignItems={'center'} spacing={2} direction={'row'}>
      <Stack spacing={2} direction={'row'} width={'100%'} margin={'auto'}>
        <Box>
          <Stack spacing={1} direction={'row'}>
            <InputLabel htmlFor="method-textfield-label-key">
              {t('labels.key')}
            </InputLabel>
            <Tooltip title={t('tooltips.header')} sx={{ padding: 0 }}>
              <IconButton>
                <InfoOutlineIcon sx={{ width: '1.1rem' }} />
              </IconButton>
            </Tooltip>
          </Stack>
          <Controller
            name={`headers.${index}.key`}
            control={control}
            defaultValue={data.key || ''}
            render={({ field }) => (
              <Autocomplete
                sx={{ width: '15rem' }}
                options={headerKeys}
                freeSolo
                value={field.value}
                onInputChange={(_, value) => {
                  field.onChange(value);
                  setOptions(getOptionsByKey(value));
                }}
                renderInput={(params) => (
                  <TextField {...params} id="method-textfield-label-key" />
                )}
              />
            )}
          />
        </Box>
        <Stack width={'100%'}>
          <InputLabel htmlFor="method-textfield-label-value">
            {t('labels.value')}
          </InputLabel>
          <Controller
            name={`headers.${index}.value`}
            control={control}
            defaultValue={data.value || ''}
            render={({ field }) => (
              <Autocomplete
                sx={{ width: '15rem' }}
                options={options}
                freeSolo
                value={field.value}
                onInputChange={(_, value) => {
                  field.onChange(value);
                }}
                renderInput={(params) => (
                  <TextField {...params} id="method-textfield-label-value" />
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
            marginTop: '1rem',
          }}
        >
          <HighlightOffIcon />
        </Button>
      </Stack>
    </Stack>
  );
}
