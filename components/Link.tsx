import React, { LinkHTMLAttributes } from 'react';
import Link from 'next/link';
import { BoxProps, Box } from '@chakra-ui/core';

type LinkProps = LinkHTMLAttributes<Link> & BoxProps;

export default React.forwardRef<Link, LinkProps>((props, ref) => {
  const { children } = props;
  return (
    <Box as={Link} ref={ref} {...props}>
      {children}
    </Box>
  );
});
