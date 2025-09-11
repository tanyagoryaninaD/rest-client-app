'use client';

import { Button, Container, Stack, Typography } from '@mui/material';
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
    <Container sx={{ placeContent: 'center' }}>
      <Stack alignItems="center" spacing={2}>
        <Typography variant="h3" component="h1" textAlign="center">
          {t('title')}
        </Typography>
        <Image src={'/404.png'} alt={''} width={350} height={210} priority />
        <Button onClick={handlerBack}>{t('button')}</Button>
      </Stack>
    </Container>
  );
}
