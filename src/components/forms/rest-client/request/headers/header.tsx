'use client';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  InputLabel,
  TextField,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';

import type {
  HeaderDataProps,
  HeaderProps,
} from '@/types/components/rest-client';

export default function Header(props: HeaderProps) {
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
    <Box
      sx={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', gap: '1rem', width: '100%' }}>
        <Box>
          <Box sx={{ display: 'flex', gap: '0.5rem' }}>
            <InputLabel htmlFor="method-textfield-label-key">Key</InputLabel>
            <Tooltip
              title="You can enter your own values. Autocomplete offers examples, but you can ignore them."
              sx={{ padding: 0 }}
            >
              <IconButton>
                <InfoOutlineIcon sx={{ width: '1.1rem' }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Autocomplete
            id="method-textfield-label-key"
            sx={{ width: '15rem' }}
            options={headerKeys}
            freeSolo={true}
            onInputChange={(_, value) => {
              updateKey(value);
            }}
            value={dataState.key}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
        <Box sx={{ width: '100%' }}>
          <InputLabel htmlFor="method-textfield-label-value">Value</InputLabel>
          <Autocomplete
            id="method-textfield-label-value"
            options={getKeyValues(dataState.key)}
            freeSolo={true}
            onInputChange={(_, value) => {
              updateValue(value);
            }}
            value={dataState.value}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
      </Box>
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
    </Box>
  );
}
