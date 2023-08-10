import * as React from 'react';
import { ErrorBoundary } from '../../ErrorBoundary';
import { Divider, Drawer, IconButton, List, Toolbar } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';
import { LayoutProps } from '..';
import { INavItem } from '../../../types/universalTypes';
import { NavItems } from '../nav/NavItems';
import { navItems } from '../../../features/protected/sidebarData';

export type SidebarProps = LayoutProps & {
  navItems: INavItem[];
};

const Sidebar = (props: SidebarProps) => {
  const { openSidebar, toggleOpenSidebar } = props;

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
          <List component="nav">
            <NavItems navItems={navItems} />
          </List>
        </Drawer>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export { Sidebar };
