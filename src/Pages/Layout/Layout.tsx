import { Navbar } from '../../Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { TitleBar } from '../../Components/TitleBar/TitleBar';
import { Box } from '../../Components/Box/Box';

export const Layout = () => {
  return (
    <Box id="layout" flexDirection="column" fullHeight>
      <TitleBar />
      <Box id="layout-content" flexGrow={1}>
        <Navbar />
        <Outlet />
      </Box>
    </Box>
  );
};
