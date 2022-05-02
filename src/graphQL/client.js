import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink, HttpLink, split } from '@apollo/client';
import { createAuthLink } from 'aws-appsync-auth-link';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import AppSyncConfig from '../aws-exports';

const url = AppSyncConfig.aws_appsync_graphqlEndpoint;
const region = AppSyncConfig.aws_appsync_region;
const auth = {
    type: AppSyncConfig.aws_appsync_authenticationType,
    apiKey: AppSyncConfig.aws_appsync_apiKey,
};

const wsLink = new GraphQLWsLink(createClient({
    url: 'wss://st4f2nirdnbapd42zyrwfomogu.appsync-realtime-api.ap-southeast-2.amazonaws.com/graphql',
    options: { reconnect: true },
    on: {
        connected: (socket) => console.log(socket)
    },
    connectionParams: {
        headers: {
          'x-api-key': "da2-hfgen5dsjjdwjgndi4uypxdmze"
        },
    },  
}));

const httpLink = new HttpLink({
    uri: url
});

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const link = ApolloLink.from([
    createAuthLink({ url, region, auth }),
    splitLink,
    createHttpLink({ uri: url }),
]);
const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

export default client;
