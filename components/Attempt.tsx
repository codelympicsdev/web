import { Attempt } from '../graphql';
import { Box, Badge, Flex, Heading } from '@chakra-ui/core';
import Link from 'next/link';

export const AttemptRow = (props: { attempt: Attempt; i: number }) => {
  const { attempt } = props;
  const now = new Date();
  const startedDate = new Date(attempt.started);
  const timeoutDate = new Date(attempt.timeout);
  const completedDate = new Date(attempt.completed);
  const isCorrect =
    attempt.recieved_output &&
    attempt.expected_output &&
    attempt.recieved_output.stdout == attempt.expected_output.stdout &&
    attempt.recieved_output.stderr == attempt.expected_output.stderr;

  return (
    <Link href='/attempt/[attemptID]' as={`/attempt/${attempt.id}`}>
      <Flex w='100%' borderY='1px' justify='space-between' p={2}>
        <Flex>
          <Heading size='md' mr={2}>
            Attempt {props.i}
          </Heading>
          <Box>
            {attempt.completed ? (
              attempt.expected_output ? (
                isCorrect ? (
                  <Badge rounded='full' px='2' variantColor='green'>
                    Correct Response
                  </Badge>
                ) : (
                  <Badge rounded='full' px='2' variantColor='red'>
                    Incorrect Response
                  </Badge>
                )
              ) : (
                <Badge rounded='full' px='2' variantColor='blue'>
                  Waiting for results
                </Badge>
              )
            ) : timeoutDate > now ? (
              <Badge rounded='full' px='2' variantColor='red'>
                Timed out
              </Badge>
            ) : (
              <Badge rounded='full' px='2' variantColor='blue'>
                Running
              </Badge>
            )}
          </Box>
        </Flex>
        <Box
          color='gray.500'
          fontWeight='semibold'
          letterSpacing='wide'
          fontSize='xs'
          textTransform='uppercase'>
          Started at {startedDate.toLocaleString()}
        </Box>
      </Flex>
    </Link>
  );
};
