import { useRouter } from 'next/router';
import { Flex, Heading, Box, Text } from '@chakra-ui/core';
import { GraphQLHelper, isQueryReady } from '../../components/GraphQL';
import { useChallengeDetailsQuery } from '../../graphql';
import { useUserSignedIn } from '../../components/Token';
import { AttemptRow } from '../../components/Attempt';
import { Markdown } from '../../components/Markdown';
import { formatDistance, isBefore } from 'date-fns';
import Link from '../../components/Link';
import Head from 'next/head';

const SigninMessage = () => {
  const { asPath } = useRouter();

  return (
    <Text mt={2}>
      To submit an attempt for this challenge, please{' '}
      <Link
        href={`/signin?redirect=${encodeURIComponent(asPath)}`}
        color='blue.500'>
        sign in
      </Link>
      .
    </Text>
  );
};

const Challenge = () => {
  const isSignedIn = useUserSignedIn();
  const router = useRouter();
  const { challengeID } = router.query;

  const query = useChallengeDetailsQuery({
    variables: {
      id: Array.isArray(challengeID) ? challengeID[0] : challengeID,
      signedIn: useUserSignedIn(),
    },
  });
  if (!isQueryReady(query)) {
    return (
      <>
        <Head>
          <title>Loading challenge | codelympics.dev</title>
        </Head>
        <Flex align='center' direction='column' pt={5}>
          <GraphQLHelper query={query} />
        </Flex>
      </>
    );
  }
  const { challenge } = query.data;
  const now = new Date();
  const publishDate = new Date(challenge.publish_date);
  const resultsDate = new Date(challenge.results_date);
  const resultsPublished = isBefore(now, resultsDate);

  return (
    <>
      <Head>
        <title>{challenge.name} | codelympics.dev</title>
      </Head>
      <Box>
        <Heading as='h2' size='xl'>
          {challenge.name}
        </Heading>
        <Box
          mt={2}
          color='gray.500'
          fontWeight='semibold'
          letterSpacing='wide'
          fontSize='xs'
          textTransform='uppercase'>
          Published at {publishDate.toLocaleString()} &bull;{' '}
          {resultsPublished
            ? `Results in ${formatDistance(now, resultsDate)}`
            : 'Challenge is over'}
        </Box>
        <Box mt={4}>
          <Markdown source={challenge.description} />
        </Box>

        <Heading size='lg' mt={5}>
          Attempts
        </Heading>
        {isSignedIn ? (
          <Flex
            align='stretch'
            w='100%'
            direction='column'
            mt={5}
            rounded='lg'
            borderWidth='1px'
            overflow='hidden'>
            {challenge.attempts
              ? challenge.attempts.map((attempt, i) => (
                  <AttemptRow
                    attempt={attempt}
                    i={challenge.attempts.length - i}
                    key={attempt.id}
                  />
                ))
              : null}
          </Flex>
        ) : (
          <SigninMessage />
        )}
      </Box>
    </>
  );
};

export default Challenge;
