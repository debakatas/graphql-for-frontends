import { createHttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import gql from 'graphql-tag';
import { InMemoryCache } from 'apollo-cache-inmemory';

// I created a 15min account for this only 🤡
const token = '5452cb34d0787d7e1860f617ca349aaee70cf058';

const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
});

const authLink = setContext((_, { headers }) => ({
    headers: {
        ...headers,
        authorization: `Bearer ${token}`,
    },
}));

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});


export default client;
