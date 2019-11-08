import {
  Box,
  ColorModeProvider,
  CSSReset,
  Link,
  Text,
  ThemeProvider,
  Divider,
} from '@chakra-ui/core';
import Header from '../components/Header';
import { getToken, removeToken, getPublicKey } from '../util/auth';
import { TokenProvider } from '../components/Token';

import withData from '../util/graphql';
import { ApolloProvider } from '@apollo/react-hooks';
import { verify } from 'jsonwebtoken';

const Main = props => <Box as='main' mx='auto' mb='3rem' {...props} />;

const Footer = props => (
  <Box textAlign='center' pt='4' pb='4' fontSize='sm' opacity='0.6' {...props}>
    <Text>
      Proudly made in{' '}
      <span aria-label='Europe' role='img'>
        🇪🇺
      </span>
      .
    </Text>
    <Text mt='4'>
      Released under the MIT License. Contribute on{' '}
      <Link
        color='blue.600'
        href='https://github.com/codelympicsdev'
        target='__blank'>
        GitHub
      </Link>
      .
    </Text>
    <Text>Copyright &copy; {new Date().getFullYear()} codelympics.dev</Text>
  </Box>
);

const Layout = ({ children }) => (
  <Box>
    <Header />
    <Box mt='4rem'>
      <Main maxWidth='60rem' pt={8} px={5}>
        {children}
      </Main>
      <Divider />
      <Footer />
    </Box>
  </Box>
);

const App = ({ Component, pageProps, token, apollo }) => {
  let darkMode = false;
  if (typeof window !== 'undefined') {
    darkMode = matchMedia('(prefers-color-scheme: dark)').matches;
  }

  return (
    <TokenProvider token={token}>
      <ApolloProvider client={apollo}>
        <ThemeProvider>
          <ColorModeProvider value={darkMode ? 'dark' : 'light'}>
            <CSSReset />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ColorModeProvider>
        </ThemeProvider>
      </ApolloProvider>
    </TokenProvider>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  let token = getToken(ctx);
  if (token) {
    const publicKey = await getPublicKey();
    try {
      verify(token, publicKey);
    } catch (error) {
      console.error(token, error);
      token = null;
      removeToken(ctx);
    }
  }
  return { pageProps, token };
};

export default withData(App as any);
