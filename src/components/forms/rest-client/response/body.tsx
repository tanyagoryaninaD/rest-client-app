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
        sx={{
          position: 'absolute',
          left: 0,
          top: 0,
          transform: 'translate(14px, -9px) scale(0.75)',
          color: 'var(--mui-palette-text-secondary)',
          zIndex: 1,
        }}
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
          position: 'absolute',
          bottom: 0,
          right: 0,
          top: '-5px',
          left: 0,
        }}
      >
        <Box
          component={'legend'}
          className="mui-ex8a5f-MuiNotchedOutlined-root"
          sx={{ fontSize: '0.75em' }}
        >
          <Box
            component={'span'}
            sx={{
              color: 'var(--mui-palette-text-secondary)',
              fontSize: ' 1rem',
              paddingLeft: '5px',
              paddingRight: '5px',
              opacity: 0,
            }}
          >
            {t('labels.body')}
          </Box>
        </Box>
        {typeof props.body === 'object' ? (
          <JsonView value={props.body} style={lightTheme} />
        ) : typeof props.body === 'string' ? (
          <Typography fontFamily="monospace" fontSize="13px">
            {props.body}
          </Typography>
        ) : (
          <Typography
            sx={{
              color: 'var(--mui-palette-text-secondary)',
              fontFamily: 'monospace',
              cursor: 'default',
            }}
          >
            {t('placeholders.body')}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
