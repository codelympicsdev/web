import { Heading, Flex, Text, Button } from '@chakra-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';

const Unauthenticated = () => {
  const { query } = useRouter();

  return (
    <>
      <Head>
        <title>Missing authentication | codelympics.dev</title>
      </Head>
      <Flex align='center' direction='column'>
        <Heading size='lg'>The page your are trying to visit</Heading>
        <Heading size='2xl'>requires authentication.</Heading>
        <Link
          href={
            '/signin?redirect=' +
            (Array.isArray(query.redirect) ? '/' : query.redirect || '/')
          }>
          <Button variantColor='blue' mt={5} size='lg'>
            Sign in
          </Button>
        </Link>
      </Flex>
    </>
  );
};

export default Unauthenticated;
