import { NextPage } from 'next';
import { redirect } from '../util/redirect';
import { removeToken } from '../util/auth';

interface LoginProps {
  redirectURL: string;
}

const Login: NextPage<LoginProps> = ({ redirectURL }) => {
  return (
    <div>
      Redirecting. If you are not redirected automatically please click{' '}
      <a href={redirectURL}>here</a>.
    </div>
  );
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
