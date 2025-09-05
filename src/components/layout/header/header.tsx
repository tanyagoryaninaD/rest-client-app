'use client';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import LocaleSwitcher from '@/components/localeSwitcher/LocaleSwitcher';
import { Link, usePathname } from '@/i18n/navigation';

import AuthPanel from './auth-panel/auth-panel';
import HeaderIconButton from './header-icon-button/header-icon-button';

export default function Header() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // TODO: Add user context
  const user = undefined;

  const closeSidebar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <AppBar color="inherit" position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <MuiLink
          href="/"
          color="inherit"
          component={Link}
          underline={pathname === '/' ? 'always' : 'hover'}
        >
          <Typography fontWeight="normal" variant="h6" sx={{ flexGrow: 1 }}>
            TDA REST Client
          </Typography>
        </MuiLink>
        <Stack direction="row" spacing={2}>
          {!isSidebarOpen && (
            <AuthPanel
              isSidebarOpen={isSidebarOpen}
              user={user}
              closeSidebar={closeSidebar}
            />
          )}
          <LocaleSwitcher />
          <HeaderIconButton
            handleClick={toggleSidebar}
            sxStyleProps={{
              display: {
                md: 'none',
              },
            }}
          >
            <MenuIcon />
          </HeaderIconButton>
        </Stack>
      </Toolbar>

      <Drawer
        anchor="right"
        inert={!isSidebarOpen}
        open={isSidebarOpen}
        onClose={toggleSidebar}
        sx={{
          '& .MuiDrawer-paper': {
            width: {
              xs: '100%',
              sm: 250,
            },
            minWidth: '40px',
          },
        }}
      >
        <Box sx={{ padding: 4, alignSelf: 'flex-end' }}>
          <HeaderIconButton handleClick={toggleSidebar}>
            <CloseIcon />
          </HeaderIconButton>
        </Box>

        <Divider variant="middle" />

        <Box sx={{ padding: 4, flexGrow: 1 }}>
          <Box>
            <AuthPanel
              isSidebarOpen={isSidebarOpen}
              user={user}
              closeSidebar={closeSidebar}
            />
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}
