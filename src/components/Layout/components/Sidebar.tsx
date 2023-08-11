import * as React from 'react';
import { ErrorBoundary } from '../../ErrorBoundary';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { ChevronLeft, Logout } from '@mui/icons-material';
import { LayoutProps } from '..';
import { INavItem } from '../../../types/universalTypes';
import { NavItems } from '../nav/NavItems';
import { navItems } from '../../../features/protected/sidebarData';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export type SidebarProps = LayoutProps & {
  navItems: INavItem[];
};

const Sidebar = (props: SidebarProps) => {
  const { openSidebar, toggleOpenSidebar } = props;

  const { t } = useTranslation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem(import.meta.env.VITE_APP_TOKEN_NAME);
    navigate('/auth');
  };

  return (
    <ErrorBoundary>
      <React.Suspense>
        <Drawer
          className={`[&>*]:relative transition-all ${
            openSidebar ? 'w-60' : 'w-16'
          }`}
          variant="permanent"
          open={openSidebar}
        >
          <Toolbar className="flex items-center justify-end px-1">
            <IconButton onClick={toggleOpenSidebar}>
              <ChevronLeft />
            </IconButton>
          </Toolbar>
          <Divider />
          <Box className="flex flex-col justify-between h-full mb-4">
            <List component="nav">
              <NavItems navItems={navItems} />
            </List>
            <List>
              <ListItemButton onClick={logout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary={t('logout')} />
              </ListItemButton>
            </List>
          </Box>
        </Drawer>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { Sidebar };
