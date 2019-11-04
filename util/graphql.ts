import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import withApollo from 'next-with-apollo';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';
import { getToken } from './auth';
import { GRAPHQL_URL } from './config';

const link = (token: string) =>
  createHttpLink({
    fetch,
    uri: GRAPHQL_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export default withApollo(
  ({ initialState, ctx }) =>
    new ApolloClient({
      link: link(getToken(ctx)),
      cache: new InMemoryCache()
        //  rehydrate the cache using the initial data passed from the server:
        .restore(initialState || {}),
    })
);
