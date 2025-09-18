import { Box, Typography } from '@mui/material';
import JsonView from '@uiw/react-json-view';
import { lightTheme } from '@uiw/react-json-view/light';
import { useTranslations } from 'next-intl';

import type { ResponseBodyProps } from '@/types/components/rest-client';

export default function ResponseBody(props: ResponseBodyProps) {
  const t = useTranslations('rest-client.response');

  return (
    <Box sx={{ position: 'relative', height: '15rem' }}>
      <Typography
        component={'label'}
        className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined MuiFormLabel-colorPrimary MuiFormLabel-filled MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiInputLabel-outlined mui-15kffoa-MuiFormLabel-root-MuiInputLabel-root"
      >
        {t('labels.body')}
      </Typography>
      <Box
        component={'fieldset'}
        className="MuiOutlinedInput-notchedOutline mui-1ohs4y1-MuiNotchedOutlined-root-MuiOutlinedInput-notchedOutline"
        sx={{
          border:
            '1px solid rgba(var(--mui-palette-common-onBackgroundChannel) / 0.23)',
          borderRadius: 'var(--mui-shape-borderRadius)',
          padding: 1,
          backgroundColor: 'var(--mui-palette-background-paper)',
          height: '15rem',
          overflow: 'auto',
          pointerEvents: 'auto',
        }}
      >
        <Box
          component={'legend'}
          className="mui-ex8a5f-MuiNotchedOutlined-root"
        >
          <Box component={'span'}>{t('labels.body')}</Box>
        </Box>
        {props.body ? (
          <JsonView value={props.body} style={lightTheme} />
        ) : (
          <Typography
            sx={{
              color: 'var(--mui-palette-text-secondary)',
              fontFamily: 'monospace',
            }}
          >
            {t('placeholders.body')}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
