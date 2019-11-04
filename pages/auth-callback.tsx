import { NextPage } from 'next';
import { redirect } from '../util/redirect';
import { setToken } from '../util/auth';

interface AuthCallbackProps {
  redirectURL: string;
}

const AuthCallback: NextPage<AuthCallbackProps> = ({ redirectURL }) => {
  return (
    <div>
      Redirecting. If you are not redirected automatically please click{' '}
      <a href={redirectURL}>here</a>.
    </div>
  );
};

AuthCallback.getInitialProps = async ctx => {
  let redirectURL = '/';

  const { query } = ctx;
  const token = Array.isArray(query.token) ? null : query.token;
  if (token == null) {
    redirectURL = '/login';
  } else {
    setToken(ctx, token);
  }

  redirect(ctx, redirectURL);
  return { redirectURL };
};

export default AuthCallback;
