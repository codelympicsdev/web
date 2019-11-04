export const AUTH_URL =
  process.env.NODE_ENV == 'production'
    ? 'https://auth.codelympics.dev/auth?client_id=5d23b4d2866d0626232bed80'
    : 'https://auth.codelympics.dev/auth?client_id=5dbf4c151c9d440000ffa241';

export const GRAPHQL_URL =
  process.env.NODE_ENV == 'production'
    ? 'https://api.codelympics.dev/v0/graphql'
    : 'https://api.codelympics.dev/v0/graphql';
