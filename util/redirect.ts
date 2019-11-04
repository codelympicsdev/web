import { NextPageContext } from 'next';
import Router from 'next/router';

export function redirect(ctx: NextPageContext, url: string) {
  const { res } = ctx;

  if (res) {
    res.writeHead(302, {
      Location: url,
    });
    res.end();
  } else {
    if (url.startsWith('http')) {
      window.open(url, '_self');
    } else {
      Router.push(url);
    }
  }
}
