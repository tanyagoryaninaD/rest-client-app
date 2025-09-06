'use client';
import { Link as MuiLink } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { AUTHORS } from '@/constants/authors';
import { Link } from '@/i18n/navigation';

import RssLink from './rss-link/rss-link';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 1,
        px: 1,
        mt: 'auto',
        backgroundColor: '#eeeeee',
      }}
    >
      <Stack
        spacing={2}
        alignItems="center"
        justifyContent="center"
        direction={{ xs: 'column', sm: 'row' }}
      >
        <Typography
          display="flex"
          gap={1}
          variant="body2"
          color="text.secondary"
          align="center"
          justifyContent="center"
        >
          © TDA 2025
          {AUTHORS.map((author) => (
            <MuiLink
              key={author.name}
              color="inherit"
              href={author.github}
              target="_blank"
              component={Link}
            >
              {author.name}
            </MuiLink>
          ))}
        </Typography>
        <RssLink />
      </Stack>
    </Box>
  );
}
