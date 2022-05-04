import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink, HttpLink, split } from '@apollo/client';
import { createSubscriptionHandshakeLink } from 'aws-appsync-subscription-link';
import { createAuthLink } from 'aws-appsync-auth-link';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { WebSocketLink } from "@apollo/client/link/ws";
import { SubscriptionClient } from "subscriptions-transport-ws";

import AppSyncConfig from '../aws-exports';

const url = AppSyncConfig.aws_appsync_graphqlEndpoint;
const region = AppSyncConfig.aws_appsync_region;
const auth = {
    type: AppSyncConfig.aws_appsync_authenticationType,
    apiKey: AppSyncConfig.aws_appsync_apiKey,
};

const realtime_url = "wss://st4f2nirdnbapd42zyrwfomogu.appsync-realtime-api.ap-southeast-2.amazonaws.com/graphql";

const wsLink = new GraphQLWsLink(createClient({
    url: realtime_url,
    options: { reconnect: true },
    connectionParams: {
        headers: {
          'x-api-key': "da2-hfgen5dsjjdwjgndi4uypxdmze",
          'Sec-WebSocket-Protocol': 'graphql-ws'
        },
    },  
}));

const socketLink = new WebSocketLink(
    new SubscriptionClient("wss://st4f2nirdnbapd42zyrwfomogu.appsync-realtime-api.ap-southeast-2.amazonaws.com/graphql", {
        options: {
            reconnect: true,
        },
        connectionParams: {
            headers: {
              'x-api-key': "da2-hfgen5dsjjdwjgndi4uypxdmze",
              'Sec-WebSocket-Protocol': 'graphql-ws'
            },
        },
    })
);

const httpLink = new HttpLink({
    uri: url
});

// const splitLink = split(
//     ({ query }) => {
//         const definition = getMainDefinition(query);
//         return (
//             definition.kind === 'OperationDefinition' &&
//             definition.operation === 'subscription'
//         );
//     },
//     socketLink,
//     httpLink,
// );

const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    ApolloLink.from([
       createAuthLink({ realtime_url, region, auth }), 
       socketLink
    ]),
    ApolloLink.from([
       createAuthLink({ url, region, auth }), 
       createHttpLink({ uri: url })
    ])
  );

const link = ApolloLink.from([
    createAuthLink({ url, region, auth }),
    createSubscriptionHandshakeLink(url, httpLink),
    splitLink,
]);
const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

export default client;
