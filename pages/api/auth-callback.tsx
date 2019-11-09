import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '../../util/auth';
import { HOME_URL } from '../../util/config';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, url } = req;
  let redirectURL = Array.isArray(query.redirect) ? '/' : query.redirect || '/';
  const { accessToken } = await auth.code.getToken(url, {
    redirectUri: HOME_URL + '/api/auth-callback?redirect=' + redirectURL,
  });
  if (accessToken == null) {
    redirectURL = '/signin';
  }
  res.writeHead(302, {
    'Set-Cookie': 'token=' + accessToken + ';path=/',
    Location: redirectURL,
  });
  res.end();
};
