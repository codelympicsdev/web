import { NextPageContext } from 'next';
import Router from 'next/router';

export function redirect(ctx: NextPageContext, url: string) {
  const { res } = ctx;

  if (res) {
    res.setHeader('Location', url);
    res.statusCode = 302;
    res.end();
  } else {
    if (url.startsWith('http')) {
      console.log('opening url');
      window.open(url, '_self');
    } else {
      Router.push(url);
    }
  }
}
