import { Box } from '../../Components/Box/Box';
import { Text } from '../../Components/Text/Text';

const Home = () => {
  return (
    <Box id="home-page-container" justifyContent="center" flexGrow={1}>
      <Text as="h2">Welcome to league tools!</Text>
    </Box>
  );
};

export default Home;
