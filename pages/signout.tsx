import { NextPage } from 'next';
import { redirect } from '../util/redirect';
import { removeToken, getToken } from '../util/auth';
import { Redirect } from '../components/Redirect';
import nookies from 'nookies';

interface SignoutProps {
  redirectURL: string;
}

const Signout: NextPage<SignoutProps> = ({ redirectURL }) => {
  return <Redirect redirectURL={redirectURL} page='signout page' />;
};

Signout.getInitialProps = async ctx => {
  removeToken(ctx);
  const { query } = ctx;
  const redirectURL = Array.isArray(query.redirect)
    ? '/'
    : query.redirect || '/';
  await new Promise(r => setTimeout(r, 100));
  redirect(ctx, redirectURL);
  return { redirectURL };
};

export default Signout;
