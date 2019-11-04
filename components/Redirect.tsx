import { Heading, Flex, Text, Link } from '@chakra-ui/core';

export const Redirect = (props: { page: string; redirectURL: string }) => (
  <Flex align='center' direction='column'>
    <Heading size='lg'>Redirecting you to the</Heading>
    <Heading size='2xl'>{props.page}</Heading>
    <Text mt={5}>
      If you are not redirected automatically, click{' '}
      <Link href={props.redirectURL} color='blue.600'>
        here
      </Link>
      .
    </Text>
  </Flex>
);
