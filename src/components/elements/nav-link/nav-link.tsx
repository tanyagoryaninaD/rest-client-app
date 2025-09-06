import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Link } from '@/i18n/navigation';

interface NavLinkProps {
  href: string;
  pathname: string;
  t: (key: string) => string;
  closeSidebar: () => void;
}

export function NavLink({ href, pathname, t, closeSidebar }: NavLinkProps) {
  return (
    <Button
      onClick={closeSidebar}
      sx={{ px: 2 }}
      href={`/${href}`}
      LinkComponent={Link}
      data-testid={`nav-link-${href}`}
    >
      <Typography
        sx={{
          textDecoration: pathname.includes(href) ? 'underline' : 'none',
        }}
        color="var(--foreground)"
      >
        {t(`buttons.${href}`)}
      </Typography>
    </Button>
  );
}
