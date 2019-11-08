import React, { LinkHTMLAttributes } from 'react';
import NextLink from 'next/link';
import { LinkProps, Link } from '@chakra-ui/core';

export default React.forwardRef<
  NextLink,
  LinkHTMLAttributes<NextLink> & LinkProps
>((props, ref) => {
  const { children } = props;
  return (
    <NextLink href={props.href}>
      <Link {...props}>{children}</Link>
    </NextLink>
  );
});
