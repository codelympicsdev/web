export const HOME_URL =
  process.env.NODE_ENV == 'production'
    ? 'https://codelympics.dev'
    : 'http://localhost:3000';

export const AUTH_URL =
  process.env.NODE_ENV == 'production'
    ? 'https://auth.codelympics.dev/oauth2'
    : 'https://auth.codelympics.dev/oauth2';

export const AUTH_CLIENT_ID =
  process.env.NODE_ENV == 'production'
    ? '5d23b4d2866d0626232bed80'
    : '5dbf4c151c9d440000ffa241';

export const AUTH_CLIENT_SECRET = process.env.AUTH_CLIENT_SECRET;

export const GRAPHQL_URL =
  process.env.NODE_ENV == 'production'
    ? 'https://api.codelympics.dev/v0/graphql'
    : 'https://api.codelympics.dev/v0/graphql';
