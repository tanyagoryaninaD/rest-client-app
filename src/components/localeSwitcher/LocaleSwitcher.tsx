'use client';

import * as React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, Link } from '../../i18n/navigation';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import '@/components/localeSwitcher/LocaleSwitcher.css';

export default function LocaleSwitcher() {
  const t = useTranslations('header');
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <FormControl variant="standard" sx={{ minWidth: 120 }}>
      <InputLabel id="locale-select-label">{t('languages.title')}</InputLabel>
      <Select
        labelId="locale-select-label"
        id="locale-select"
        label={t('languages.title')}
        defaultValue={locale}
      >
        <MenuItem value="en">
          <Link href={pathname} locale="en" className="local-link">
            {t('languages.en')}
          </Link>
        </MenuItem>
        <MenuItem value="ru">
          <Link href={pathname} locale="ru" className="local-link">
            {t('languages.ru')}
          </Link>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
