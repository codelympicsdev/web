import { Heading, Flex, Text, Button } from '@chakra-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Unauthenticated = () => {
  const { query } = useRouter();

  return (
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
  );
};

export default Unauthenticated;
