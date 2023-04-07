import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache, split } from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { APOLLO_FLAGS, APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { createClient } from 'graphql-ws';

const BASE_URL = 'http://localhost:4000/graphql'; // <-- add the URL of the GraphQL server here

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_FLAGS,
      useValue: {
        useInitialLoading: true, // enable it here
      },
    },

    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        // Create an http link:
        const http = httpLink.create({
          uri: BASE_URL,
        });

        // Create a WebSocket link:
        const ws = new GraphQLWsLink(
          createClient({
            url: BASE_URL.replace('http', 'ws'),
          })
        );

        // using the ability to split links, you can send data to each link
        // depending on what kind of operation is being sent
        const link = split(
          // split based on operation type
          ({ query }) => {
            const { kind, operation }: any = getMainDefinition(query);
            return (
              kind === 'OperationDefinition' && operation === 'subscription'
            );
          },
          ws,
          http
        );

        const apolloConfig: ApolloClientOptions<any> = {
          link,
          cache: new InMemoryCache(),
          credentials: 'include',
        };

        return apolloConfig;
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
