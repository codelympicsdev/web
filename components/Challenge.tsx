import { Challenge } from '../graphql';
import { Box, Badge } from '@chakra-ui/core';
import Link from 'next/link';

export const ChallengeCard = (props: { challenge: Challenge }) => {
  const { challenge } = props;
  const now = new Date();
  const publishDate = new Date(challenge.publish_date);
  const isNew =
    now.getTime() - publishDate.getTime() > 0 &&
    now.getTime() - publishDate.getTime() < 86400000;
  const isNotPublished = now.getTime() - publishDate.getTime() < 0;

  return (
    <Link href={`/challenge/${challenge.id}`}>
      <Box w='100%' m={3} borderWidth='1px' rounded='lg' overflow='hidden'>
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
          <Box d='flex' alignItems='baseline'>
            {isNew ? (
              <Badge rounded='full' px='2' variantColor='blue' mr={2} mt={2}>
                New
              </Badge>
            ) : null}
            {isNotPublished ? (
              <Badge rounded='full' px='2' variantColor='red' mr={2} mt={2}>
                Not published
              </Badge>
            ) : null}
          </Box>
        </Box>
      </Box>
    </Link>
  );
};
