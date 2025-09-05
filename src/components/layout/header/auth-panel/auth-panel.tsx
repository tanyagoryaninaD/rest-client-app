import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';

import { Link } from '@/i18n/navigation';

interface AuthPanelProps {
  user: boolean | null;
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

export default function AuthPanel({
  // TODO user
  user = null,
  isSidebarOpen,
  closeSidebar,
}: AuthPanelProps) {
  return (
    <ButtonGroup
      sx={{
        display: isSidebarOpen ? 'flex' : { xs: 'none', md: 'flex' },
        flexDirection: isSidebarOpen ? 'column' : 'row',
        gap: 1,
      }}
      size="small"
      variant="text"
    >
      {user ? (
        <Button onClick={closeSidebar} sx={{ px: 2 }}>
          <Typography color="var(--foreground)">Sign Out</Typography>
        </Button>
      ) : (
        <>
          <Button
            onClick={closeSidebar}
            sx={{ px: 2 }}
            href="./sign-in"
            LinkComponent={Link}
          >
            <Typography color="var(--foreground)">Sign In</Typography>
          </Button>
          <Button
            onClick={closeSidebar}
            sx={{ px: 2 }}
            href="./sign-up"
            LinkComponent={Link}
          >
            <Typography color="var(--foreground)">Sign Up</Typography>
          </Button>
        </>
      )}
    </ButtonGroup>
  );
}
