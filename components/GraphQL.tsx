import { Flex, CircularProgress, Heading, Text } from '@chakra-ui/core';
import { ReactElement } from 'react';
import { QueryResult } from '@apollo/react-common';
import { ApolloError } from 'apollo-client';

export const isQueryReady = (query: QueryResult) =>
  !(query.error || query.loading || !query.data);

export const GraphQLHelper = (props: { query: QueryResult }) => {
  if (props.query.error) {
    return <Error error={props.query.error} />;
  } else if (props.query.loading || !props.query.data) {
    return <Loading />;
  }
  return <></>;
};

const Error = (props: { error: ApolloError }) => (
  <>
    <Heading size='lg'>Network Error</Heading>
    <Heading size='md' mt={10}>
      For more information see the error code below.
    </Heading>
    <Text>{props.error.message}</Text>
  </>
);
const Loading = () => (
  <>
    <CircularProgress isIndeterminate />
  </>
);
