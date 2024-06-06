import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://your-graphql-api-endpoint.com/graphql', // Replace with your GraphQL API endpoint
    cache: new InMemoryCache(),
});

export default client;