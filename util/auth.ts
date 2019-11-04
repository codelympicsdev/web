import { NextPageContext } from 'next';
import nookies from 'nookies';


export const getToken = (ctx: NextPageContext) => {
  const { token } = nookies.get(ctx);
  return token;
};

export const setToken = (ctx: NextPageContext, token: string) => {
  nookies.set(ctx, 'token', token, { maxAge: 3 * 24 * 60 * 60, path: '/' });
};

export const removeToken = (ctx: NextPageContext) => {
  nookies.destroy(ctx, 'token');
};
