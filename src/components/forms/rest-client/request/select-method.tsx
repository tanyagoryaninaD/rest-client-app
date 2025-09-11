import { Box, InputLabel, MenuItem, Select } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { CLIENT_FORM, METHODS } from '@/constants/rest-client';
import { usePathname, useRouter } from '@/i18n/navigation';
import type { UseFormProps } from '@/types/components/rest-client';

export default function SelectMethod(props: UseFormProps) {
  const t = useTranslations('rest-client.request.labels');
  const pathname = usePathname();
  const router = useRouter();
  const [method, setMethod] = useState(pathname.split('/')[2] || METHODS[0]);

  useEffect(() => {
    const pathnames = pathname.split('/');
    if (pathnames.length > 2) {
      pathnames.splice(2, 1, method);
    } else {
      pathnames.push(method);
    }
    const newPathname = pathnames.join('/');

    if (newPathname !== pathname) {
      router.replace({ pathname: newPathname });
    }
  }, [method, pathname, router]);

  const handleChangeMethod: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setMethod(event.target.value);
  };

  return (
    <Box>
      <InputLabel htmlFor="method-select">{t('method')}</InputLabel>
      <Select
        sx={{ width: '8rem' }}
        slotProps={{
          input: {
            id: 'method-select',
          },
        }}
        value={method}
        {...props.register(CLIENT_FORM.method, {
          onChange: handleChangeMethod,
        })}
      >
        {METHODS.map((method) => (
          <MenuItem key={method} value={method}>
            {method}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
