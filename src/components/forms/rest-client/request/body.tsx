import { Button, TextField } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';

import { CLIENT_FORM } from '@/constants/rest-client';
import type { ClientFormStateProps } from '@/types/components/rest-client';

export default function Body() {
  const t = useTranslations('rest-client');
  const { register, watch, setValue } = useFormContext<ClientFormStateProps>();
  const currentValue = watch(CLIENT_FORM.body) ?? '';

  const handlePrettify = () => {
    try {
      const parsed = JSON.parse(currentValue) as JSON;
      const prettified = JSON.stringify(parsed, null, 2);
      setValue(CLIENT_FORM.body, prettified);
    } catch {
      toast.error(t('errors.prettify.invalid'));
    }
  };

  return (
    <>
      <TextField
        sx={{ width: '100%' }}
        multiline
        fullWidth
        label={t('request.labels.body')}
        placeholder={t('request.placeholders.body')}
        value={currentValue}
        data-testid="request-body"
        slotProps={{
          input: {
            id: 'request-body',
            sx: {
              fontFamily: 'monospace',
              '& .MuiInputBase-input': {
                maxHeight: '14rem',
                overflow: 'auto !important',
              },
            },
          },
        }}
        {...register(CLIENT_FORM.body)}
      />
      <Button
        variant="outlined"
        onClick={handlePrettify}
        sx={{ width: 'max-content' }}
        disabled={!currentValue.trim()}
      >
        {t('request.buttons.prettify')}
      </Button>
    </>
  );
}
