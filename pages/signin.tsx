import { NextPage } from 'next';
import { redirect } from '../util/redirect';
import { getToken } from '../util/auth';
import { AUTH_URL } from '../util/config';
import { Redirect } from '../components/Redirect';

interface LoginProps {
  redirectURL: string;
}

const Login: NextPage<LoginProps> = ({ redirectURL }) => {
  return <Redirect redirectURL={redirectURL} page='signin page' />;
};

Login.getInitialProps = async ctx => {
  const token = getToken(ctx);
  let redirectURL = '';
  if (token) {
    const { query } = ctx;
    redirectURL = Array.isArray(query.redirect) ? '/' : query.redirect || '/';
  } else {
    redirectURL = AUTH_URL;
  }

  redirect(ctx, redirectURL);
  return { redirectURL };
};

export default Login;
