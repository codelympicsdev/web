import { NextPageContext } from 'next';
import nookies from 'nookies';

let publicKey: string = null;

export const getPublicKey = async () => {
  if (!publicKey) {
    const req = await fetch('https://api.codelympics.dev/v0/auth/publickey');
    if (!req.ok) throw Error('could not get the public key');
    publicKey = await req.text();
  }
  return publicKey;
};

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
