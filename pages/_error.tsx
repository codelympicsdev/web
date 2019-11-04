import { Flex, Heading } from '@chakra-ui/core';

const Error = () => (
  <Flex align='center' direction='column'>
    <Heading size='lg'>Error</Heading>
    <Heading size='2xl'>404</Heading>
    <Heading size='lg' mt={10}>
      Could not find the requested page.
    </Heading>
  </Flex>
);

export default Error;
