import {
  Box,
  Flex,
  Heading,
  Text,
  Code,
  Grid,
  Link,
  TagLabel,
  TagIcon,
  Tag,
  Divider,
} from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { getToken } from '../../util/auth';
import { redirect } from '../../util/redirect';
import { useAttemptDetailsQuery } from '../../graphql';
import { GraphQLHelper, isQueryReady } from '../../components/GraphQL';
import { CodeBlock } from '../../components/CodeBlock';
import NextLink from 'next/link';
import { isBefore, formatDistance } from 'date-fns';
import { useEffect, useReducer } from 'react';
import Head from 'next/head';

type AttemptStatus =
  | 'waiting_for_submission'
  | 'timed_out'
  | 'waiting_for_results'
  | 'correct_response'
  | 'incorrect_response';

const Attempt: NextPage<{}> = () => {
  const router = useRouter();
  const { attemptID } = router.query;

  const [_, forceUpdate] = useReducer(i => ++i, 1);

  const query = useAttemptDetailsQuery({
    variables: {
      id: Array.isArray(attemptID) ? attemptID[0] : attemptID,
    },
  });
  if (!isQueryReady(query)) {
    return (
      <>
        <Head>
          <title>Loading attempt | codelympics.dev</title>
        </Head>
        <Flex align='center' direction='column' pt={5}>
          <GraphQLHelper query={query} />
        </Flex>
      </>
    );
  }
  const { attempt } = query.data;
  const { challenge } = attempt;

  const now = new Date();
  const creationDate = new Date(attempt.creation_date);
  const timeoutDate = new Date(attempt.timeout_date);
  const submissionDate = new Date(attempt.submission_date);
  const resultsDate = new Date(challenge.results_date);

  let status: AttemptStatus = 'waiting_for_submission';

  if (isBefore(timeoutDate, now)) {
    status = 'timed_out';
  }

  if (attempt.recieved_output) {
    if (attempt.expected_output) {
      if (
        attempt.recieved_output.stdout == attempt.expected_output.stdout &&
        attempt.recieved_output.stderr == attempt.expected_output.stderr
      ) {
        status = 'correct_response';
      } else {
        status = 'incorrect_response';
      }
    } else {
      status = 'waiting_for_results';
    }
  }

  useEffect(() => {
    if (status == 'waiting_for_submission' || status == 'waiting_for_results') {
      const timer = setInterval(() => forceUpdate(1), 1000);
      return () => clearInterval(timer);
    }
  }, [status]);

  const stdoutMatch =
    attempt.recieved_output &&
    attempt.expected_output &&
    attempt.recieved_output.stdout == attempt.expected_output.stdout;
  const stderrMatch =
    attempt.recieved_output &&
    attempt.expected_output &&
    attempt.recieved_output.stderr == attempt.expected_output.stderr;

  return (
    <>
      <Head>
        <title>
          {(() => {
            switch (status) {
              case 'waiting_for_submission':
                return '🕒';
              case 'timed_out':
                return '❌';
              case 'waiting_for_results':
                return '🕒';
              case 'correct_response':
                return '✔️';
              case 'incorrect_response':
                return '❌';
            }
          })()}{' '}
          Attempt | {challenge.name} | codelympics.dev
        </title>
      </Head>
      <Box>
        <Heading as='h2' size='xl'>
          Attempt
        </Heading>
        <Box
          mt={0}
          color='gray.500'
          fontWeight='semibold'
          letterSpacing='wide'
          fontSize='xs'>
          {attemptID}
        </Box>
        <Flex mt={2}>
          <Text>Challenge: </Text>
          <NextLink
            href='/challenge/[challengeID]'
            as={`/challenge/${challenge.id}`}>
            <Link color='blue.500' ml={1}>
              {challenge.name}
            </Link>
          </NextLink>
        </Flex>
        <Heading size='lg' mt={3}>
          Status
        </Heading>
        <Box mt={2}>
          <Text>Started attempt at {creationDate.toLocaleString()}</Text>
          {(() => {
            switch (status) {
              case 'waiting_for_submission':
                return (
                  <>
                    <Text>
                      Timing out in {formatDistance(now, timeoutDate)}
                    </Text>
                    <Tag variantColor='blue' mt={2}>
                      <TagLabel>Waiting for submission</TagLabel>
                      <TagIcon icon='time' size='12px' />
                    </Tag>
                  </>
                );
              case 'timed_out':
                return (
                  <>
                    <Text>Timed out at {timeoutDate.toLocaleString()}</Text>
                    <Tag variantColor='red' mt={2}>
                      <TagLabel>Timed out</TagLabel>
                      <TagIcon icon='close' size='12px' />
                    </Tag>
                  </>
                );
              case 'waiting_for_results':
                return (
                  <>
                    <Text>Submitted at {submissionDate.toLocaleString()}</Text>
                    <Text>Results in {formatDistance(now, resultsDate)}</Text>
                    <Tag variantColor='blue' mt={2}>
                      <TagLabel>
                        Submitted response - waiting for results
                      </TagLabel>
                      <TagIcon icon='time' size='12px' />
                    </Tag>
                  </>
                );
              case 'correct_response':
                return (
                  <>
                    <Text>Submitted at {submissionDate.toLocaleString()}</Text>
                    <Tag variantColor='green' mt={2}>
                      <TagLabel>Correct response</TagLabel>
                      <TagIcon icon='check' size='12px' />
                    </Tag>
                  </>
                );
              case 'incorrect_response':
                return (
                  <>
                    <Text>Submitted at {submissionDate.toLocaleString()}</Text>
                    <Tag variantColor='red' mt={2}>
                      <TagLabel>Incorrect response</TagLabel>
                      <TagIcon icon='close' size='12px' />
                    </Tag>
                  </>
                );
            }
          })()}
        </Box>
        <Divider mt={5} />
        <Heading size='lg'>Input</Heading>
        {attempt.input.arguments.length > 0 ? (
          <>
            <Heading size='sm' mt={3}>
              Arguments
            </Heading>
            <Code mt={2}>{attempt.input.arguments.join(' ')}</Code>
          </>
        ) : null}
        {attempt.input.arguments.length > 0 && attempt.input.stdin ? (
          <Divider mt={3} mb={0} />
        ) : null}
        {attempt.input.stdin ? (
          <>
            <Heading size='sm' mt={3}>
              Standard Input
            </Heading>
            <Box mt={2}>
              <CodeBlock source={attempt.input.stdin} />
            </Box>
          </>
        ) : null}
        {attempt.recieved_output ? (
          <>
            <Divider mt={5} />
            <Heading size='lg'>Output</Heading>
            <Grid
              width='100%'
              columnGap={2}
              gridTemplateColumns='repeat(auto-fit, minmax(200px, 1fr))'>
              <Box>
                <Flex mt={2} align='center'>
                  <Heading size='sm' mr={2} display='inline'>
                    Recieved Standard Output
                  </Heading>
                  {attempt.expected_output ? (
                    <Tag variantColor={stdoutMatch ? 'green' : 'red'} size='sm'>
                      <TagLabel>
                        {stdoutMatch ? 'Correct' : 'Incorrect'}
                      </TagLabel>
                      <TagIcon
                        icon={stdoutMatch ? 'check' : 'close'}
                        size='12px'
                      />
                    </Tag>
                  ) : null}
                </Flex>
                <Box mt={2}>
                  <CodeBlock source={attempt.recieved_output.stdout} />
                </Box>
              </Box>
              {attempt.expected_output ? (
                <Box>
                  <Flex align='center' wrap='wrap' height={6} mt={2}>
                    <Heading size='sm'>Expected Standard Output</Heading>
                  </Flex>
                  <Box mt={2}>
                    <CodeBlock source={attempt.expected_output.stdout} />
                  </Box>
                </Box>
              ) : null}
            </Grid>
            <Divider mt={3} mb={0} />
            <Grid
              width='100%'
              columnGap={2}
              gridTemplateColumns='repeat(auto-fit, minmax(200px, 1fr))'>
              <Box>
                <Flex mt={2} align='center' wrap='wrap'>
                  <Heading size='sm'>Recieved Standard Error</Heading>
                  {attempt.expected_output ? (
                    <Tag
                      variantColor={stderrMatch ? 'green' : 'red'}
                      size='sm'
                      ml={2}>
                      <TagLabel>
                        {stderrMatch ? 'Correct' : 'Incorrect'}
                      </TagLabel>
                      <TagIcon
                        icon={stderrMatch ? 'check' : 'close'}
                        size='12px'
                      />
                    </Tag>
                  ) : null}
                </Flex>
                <Box mt={2}>
                  <CodeBlock source={attempt.recieved_output.stderr} />
                </Box>
              </Box>
              {attempt.expected_output ? (
                <Box>
                  <Flex align='center' wrap='wrap' height={6} mt={2}>
                    <Heading size='sm'>Expected Standard Error</Heading>
                  </Flex>
                  <Box mt={2}>
                    <CodeBlock source={attempt.expected_output.stderr} />
                  </Box>
                </Box>
              ) : null}
            </Grid>
          </>
        ) : null}
      </Box>
    </>
  );
};

Attempt.getInitialProps = async ctx => {
  const token = getToken(ctx);
  if (!token) {
    redirect(
      ctx,
      '/unauthenticated?redirect=' + encodeURIComponent(ctx.asPath)
    );
  }

  return {};
};

export default Attempt;
