import * as React from 'react';
import { Layout } from '../../components/Layout';
import { IPagesProps } from '../../libs/react-router-dom/routes';
import { navItems } from './sidebarData';

type Props = IPagesProps & {
  element: React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  > | null;
};

const ProtectedPage = (props: Props) => {
  const { element, pageLabel } = props;
  const { Header, Content, Sidebar } = Layout;

  const [openSidebar, setOpenSidebar] = React.useState(false);

  const toggleOpenSidebar = () => setOpenSidebar(!openSidebar);

  return (
    <Layout>
      <Header
        openSidebar={openSidebar}
        toggleOpenSidebar={toggleOpenSidebar}
        pageLabel={pageLabel}
      />
      <Sidebar
        openSidebar={openSidebar}
        toggleOpenSidebar={toggleOpenSidebar}
        navItems={navItems}
      />
      <Content openSidebar={openSidebar} toggleOpenSidebar={toggleOpenSidebar}>
        {element}
      </Content>
    </Layout>
  );
};

export default ProtectedPage;
