import { NgModule, isDevMode } from '@angular/core';
import { InMemoryCache, from, split } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { NgxsModule, Store } from '@ngxs/store';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { createClient } from 'graphql-ws';
import { JwtTokenState } from '../store/jwtTokens/jwtTokens.state';

const BASE_URL = isDevMode()
  ? 'http://localhost:4000/graphql'
  : 'https://imzihad21.is-a.dev/graphql';

@NgModule({
  exports: [ApolloModule],
  imports: [NgxsModule.forFeature([JwtTokenState])],
})
export class GraphQLModule {
  constructor(apollo: Apollo, httpLink: HttpLink, store: Store) {
    const getAccessToken = (): string => {
      const { accessToken = '' } = store?.selectSnapshot(JwtTokenState);
      return `Bearer ${accessToken}`;
    };

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: getAccessToken(),
        },
      };
    });

    // Create an http link:
    const http = httpLink?.create({
      uri: BASE_URL,
    });

    // Create a WebSocket link:
    const websocket = new GraphQLWsLink(
      createClient({
        url: BASE_URL.replace('http', 'ws'),
        connectionParams: async () => {
          return {
            authorization: getAccessToken(),
          };
        },
      })
    );

    const connectionLink = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation }: any = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      websocket,
      http
    );

    apollo.create({
      link: from([authLink, connectionLink]),
      cache: new InMemoryCache(),
      credentials: 'include',
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all',
        },
      },
    });
  }
}
