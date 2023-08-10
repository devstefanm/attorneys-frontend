import { Box, CssBaseline } from '@mui/material';
import * as React from 'react';
import { Header, HeaderProps } from './components/Header';
import { Content, ContentProps } from './components/Content';
import { Sidebar, SidebarProps } from './components/Sidebar';

export type LayoutProps = {
  openSidebar: boolean;
  toggleOpenSidebar: () => void;
};

class Layout extends React.Component<{ children: React.ReactNode }> {
  static Header = ({ ...props }: HeaderProps) => <Header {...props} />;
  static Sidebar = ({ ...props }: SidebarProps) => <Sidebar {...props} />;
  static Content = ({ children, ...props }: ContentProps) => (
    <Content {...props}>{children}</Content>
  );

  render() {
    const { children } = this.props;
    return (
      <Box className="h-screen flex">
        <CssBaseline />
        {children}
      </Box>
    );
  }
}
export { Layout };
