import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URL || 'http://localhost:3500/graphql',
    cache: new InMemoryCache()
  });

export default client;