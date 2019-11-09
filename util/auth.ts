import { NextPageContext } from 'next';
import nookies from 'nookies';
import ClientOAuth2 from 'client-oauth2';
import { AUTH_CLIENT_ID, AUTH_URL, AUTH_CLIENT_SECRET } from './config';
import fetch from 'isomorphic-unfetch';

export const auth = new ClientOAuth2(
  {
    clientId: AUTH_CLIENT_ID,
    clientSecret: AUTH_CLIENT_SECRET,
    accessTokenUri: AUTH_URL + '/token',
    authorizationUri: AUTH_URL + '/auth',
    scopes: [['user.basic', 'challenge.attempt.read'].join(',')],
  },
  async (method, url, body, headers) => {
    const heads = {};
    Object.keys(headers).forEach(h => {
      const header = headers[h];
      heads[h] = Array.isArray(header) ? header.join(',') : header;
    });
    const req = await fetch(url, {
      method,
      body,
      headers: {
        ...heads,
      },
    });
    return { status: req.status, body: await req.text() };
  }
);

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
