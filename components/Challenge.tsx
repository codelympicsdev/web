import { Challenge } from '../graphql';
import { Box, Badge, Flex } from '@chakra-ui/core';
import Link from 'next/link';
import { isBefore, isAfter, differenceInHours, formatDistance } from 'date-fns';

export const ChallengeCard = (props: { challenge: Challenge }) => {
  const { challenge } = props;
  const now = new Date();
  const publishDate = new Date(challenge.publish_date);
  const resultsDate = new Date(challenge.results_date);
  const isNew =
    now.getTime() - publishDate.getTime() > 0 &&
    now.getTime() - publishDate.getTime() < 86400000;
  const isNotPublished = isAfter(publishDate, now);
  const isOver = isBefore(resultsDate, now);
  const nearlyOver = differenceInHours(resultsDate, now) <= 24;

  return (
    <Link href='/challenge/[challengeID]' as={`/challenge/${challenge.id}`}>
      <Box
        w='100%'
        maxW={300}
        m={3}
        borderWidth='1px'
        rounded='lg'
        overflow='hidden'>
        <Box p='6'>
          <Box fontWeight='semibold' as='h4' lineHeight='tight' isTruncated>
            {challenge.name}
          </Box>
          <Box>
            <Box
              color='gray.500'
              fontWeight='semibold'
              letterSpacing='wide'
              fontSize='xs'
              textTransform='uppercase'>
              Published at {publishDate.toLocaleString()}
            </Box>
          </Box>
          <Flex wrap='wrap'>
            {isOver ? (
              <Badge rounded='full' px='2' variantColor='gray' mr={2} mt={2}>
                Results published
              </Badge>
            ) : (
              <Badge rounded='full' px='2' variantColor='green' mr={2} mt={2}>
                Running now
              </Badge>
            )}
            {isNew ? (
              <Badge rounded='full' px='2' variantColor='blue' mr={2} mt={2}>
                New
              </Badge>
            ) : null}
            {!isOver && nearlyOver ? (
              <Badge rounded='full' px='2' variantColor='blue' mr={2} mt={2}>
                {formatDistance(now, resultsDate)} left
              </Badge>
            ) : null}
            {isNotPublished ? (
              <Badge rounded='full' px='2' variantColor='red' mr={2} mt={2}>
                Not published
              </Badge>
            ) : null}
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};
