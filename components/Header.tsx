import { Box, Flex, useColorMode, Image, Button } from '@chakra-ui/core';
import Link from 'next/link';
import { useToken } from './Token';

const Header = () => {
  const token = useToken();

  const { colorMode } = useColorMode();
  const bg = { light: 'white', dark: 'gray.800' };
  return (
    <Box
      pos='fixed'
      as='header'
      top='0'
      zIndex={4}
      bg={bg[colorMode]}
      left='0'
      right='0'
      borderBottomWidth='1px'
      width='full'
      height='4rem'>
      <Flex size='100%' px='6' align='center'>
        <Flex align='center' mr={0}>
          <>
            <Link href='/'>
              <img
                src='/static/logo_no_slogan.png'
                style={{ height: 32, width: 64 }}
                alt=''
              />
            </Link>
            <Link href='/'>
              <a>&nbsp;&nbsp;codelympics.dev</a>
            </Link>
          </>
        </Flex>
        <Flex mx='auto'></Flex>
        <Flex
          flex={{ sm: '1', md: 'none' }}
          ml={0}
          align='center'
          color='gray.500'
          justify='flex-end'>
          <Link href={token ? '/logout' : '/login'}>
            <Button variant='ghost' color='current'>
              {token ? 'Logout' : 'Login'}
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
