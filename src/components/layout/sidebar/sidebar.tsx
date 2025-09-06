import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';

import AuthPanel from '../header/auth-panel/auth-panel';
import HeaderIconButton from '../header/header-icon-button/header-icon-button';

interface SidebarProps {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
  // TODO: Add user context
  user?: { name: string };
}

export default function Sidebar({
  isSidebarOpen,
  closeSidebar,
  user,
}: SidebarProps) {
  return (
    <Drawer
      anchor="right"
      inert={!isSidebarOpen}
      open={isSidebarOpen}
      onClose={closeSidebar}
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
        <HeaderIconButton testId="close-menu-button" handleClick={closeSidebar}>
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
  );
}
