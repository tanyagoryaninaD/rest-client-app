'use client';
import './not-found.css';

import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { useRouter } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('not-found');
  const routing = useRouter();

  const handlerBack = () => {
    routing.back();
  };

  return (
    <Container className={'not-found-container'}>
      <Box className={'not-found-box'}>
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          {t('title')}
        </Typography>
        <Image src={'/404.png'} alt={''} width={350} height={210} priority />
        <Button onClick={handlerBack}>{t('button')}</Button>
      </Box>
    </Container>
  );
}
