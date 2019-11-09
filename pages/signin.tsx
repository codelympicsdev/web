import { NextPage } from 'next';
import { redirect } from '../util/redirect';
import { Redirect } from '../components/Redirect';
import { auth } from '../util/auth';
import { HOME_URL } from '../util/config';

interface LoginProps {
  redirectURL: string;
}

const Login: NextPage<LoginProps> = ({ redirectURL }) => {
  return <Redirect redirectURL={redirectURL} page='signin page' />;
};

Login.getInitialProps = async ctx => {
  const { query } = ctx;
  const r = Array.isArray(query.redirect) ? '/' : query.redirect || '/';
  const redirectURL = auth.code.getUri({
    redirectUri: HOME_URL + '/api/auth-callback?redirect=' + r,
  });
  redirect(ctx, redirectURL);
  return { redirectURL };
};

export default Login;
