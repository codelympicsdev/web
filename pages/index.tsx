import React from 'react';
import { Heading, Avatar, Flex, Text, CircularProgress } from '@chakra-ui/core';
import { useCurrentUserQuery, useLatestChallengesQuery } from '../graphql';
import { useToken } from '../components/Token';
import { ChallengeCard } from '../components/Challenge';

const Home = () => {
  const token = useToken();
  if (!token) {
    return <>You are not signed in!</>;
  }

  const userQuery = useCurrentUserQuery();
  const challengesQuery = useLatestChallengesQuery();
  if (userQuery.error || challengesQuery.error) {
    return (
      <>
        {(userQuery.error ? userQuery.error.message : '') ||
          (challengesQuery.error ? challengesQuery.error.message : '')}
      </>
    );
  }
  if (userQuery.loading || challengesQuery.loading) {
    return (
      <Flex align='center' direction='column'>
        <CircularProgress isIndeterminate />
      </Flex>
    );
  }

  const { me } = userQuery.data;
  const { challenges } = challengesQuery.data;

  return (
    <Flex align='center' direction='column'>
      <Avatar src={me.avatar_url} size='lg' />
      <Heading as='h1' size='xl' pt={5} textAlign='center'>
        Welcome back {me.full_name}!
      </Heading>
      <Text textAlign='center' pt={3}>
        Here are some of our latest challenges.
      </Text>
      <Flex pt={5}>
        {challenges.map(challenge => (
          <ChallengeCard challenge={challenge} key={challenge.id} />
        ))}
      </Flex>
    </Flex>
  );
};

export default Home;
