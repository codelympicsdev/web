import { NextPage } from 'next';
import { redirect } from '../util/redirect';
import { removeToken } from '../util/auth';
import { Redirect } from '../components/Redirect';

interface LoginProps {
  redirectURL: string;
}

const Login: NextPage<LoginProps> = ({ redirectURL }) => {
  return <Redirect redirectURL={redirectURL} page='signout page' />;
};

Login.getInitialProps = async ctx => {
  removeToken(ctx);

  const { query } = ctx;
  const redirectURL = Array.isArray(query.redirect)
    ? '/'
    : query.redirect || '/';
  redirect(ctx, redirectURL);
  return { redirectURL };
};

export default Login;
