import React from 'react';
import { Heading, Avatar, Flex, Text } from '@chakra-ui/core';
import { useHomeQuery, HomeQueryResult } from '../graphql';
import { useUserSignedIn } from '../components/Token';
import { ChallengeCard } from '../components/Challenge';
import { GraphQLHelper, isQueryReady } from '../components/GraphQL';

const Home = () => {
  const userSignedIn = useUserSignedIn();
  const query = useHomeQuery({
    variables: {
      signedIn: userSignedIn,
    },
  });
  if (!userSignedIn) {
    return (
      <Flex align='center' direction='column'>
        <Heading as='h2' size='lg' pt={5} textAlign='center'>
          Welcome to
        </Heading>
        <Heading as='h1' size='2xl' pt={1} textAlign='center'>
          codelympics.dev
        </Heading>
        <Text textAlign='center' pt={2}>
          Solve challenges, earn points and win.
        </Text>
        <Text textAlign='center' pt={5}>
          Here are some of our latest challenges for you to solve.
        </Text>
        <ChallengeGrid query={query} />
      </Flex>
    );
  }

  if (!isQueryReady(query)) {
    return (
      <Flex align='center' direction='column'>
        <GraphQLHelper query={query} />
      </Flex>
    );
  }
  const { me } = query.data;
  return (
    <Flex align='center' direction='column'>
      <Avatar src={me.avatar_url} size='lg' />
      <Heading as='h1' size='xl' pt={5} textAlign='center'>
        Welcome back {me.full_name}!
      </Heading>
      <Text textAlign='center' pt={3}>
        Here are some of our latest challenges.
      </Text>
      <ChallengeGrid query={query} />
    </Flex>
  );
};

const ChallengeGrid = (props: { query: HomeQueryResult }) => {
  const { query } = props;
  if (!isQueryReady(query)) {
    return (
      <Flex align='center' direction='column' pt={5}>
        <GraphQLHelper query={query} />
      </Flex>
    );
  }
  const { challenges } = query.data;

  return (
    <Flex align='stretch' w='100%' justify='center' wrap='wrap' pt={5}>
      {challenges.map(challenge => (
        <ChallengeCard challenge={challenge} key={challenge.id} />
      ))}
    </Flex>
  );
};

export default Home;
