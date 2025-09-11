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

import type {
  HeaderDataProps,
  HeaderProps,
} from '@/types/components/rest-client';

export default function Header(props: HeaderProps) {
  const t = useTranslations('rest-client.request');
  const { headerKeys, getKeyValues, handleUpdate, handleRemoveHeader } = props;
  const [dataState, setDataState] = useState<HeaderDataProps>(props.data);

  const updateKey = (key: string) => {
    const newState = { ...dataState, key };
    setDataState(newState);
    handleUpdate({ id: dataState.id, key });
  };

  const updateValue = (value: string) => {
    const newState = { ...dataState, value };
    setDataState(newState);
    handleUpdate({ id: dataState.id, value });
  };

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
          <Autocomplete
            sx={{ width: '15rem' }}
            options={headerKeys}
            freeSolo={true}
            onInputChange={(_, value) => {
              updateKey(value);
            }}
            value={dataState.key}
            renderInput={(params) => (
              <TextField {...params} id="method-textfield-label-key" />
            )}
          />
        </Box>
        <Stack width={'100%'}>
          <InputLabel htmlFor="method-textfield-label-value">
            {t('labels.value')}
          </InputLabel>
          <Autocomplete
            options={getKeyValues(dataState.key)}
            freeSolo={true}
            onInputChange={(_, value) => {
              updateValue(value);
            }}
            value={dataState.value}
            renderInput={(params) => (
              <TextField {...params} id="method-textfield-label-value" />
            )}
          />
        </Stack>
      </Stack>
      <Stack>
        <Button
          onClick={() => {
            handleRemoveHeader(dataState.id);
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
