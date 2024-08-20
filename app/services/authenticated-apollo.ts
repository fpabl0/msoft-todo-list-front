import ApolloService from 'ember-apollo-client/services/apollo';
import { type ApolloClientOptions, type ServerError } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { service } from "@ember/service";
import type AuthService from "./auth";

export default class AuthenticatedApolloService extends ApolloService {
  @service('auth') authService?: AuthService;

  clientOptions(): ApolloClientOptions<any> {
    return { link: this.link(), cache: super.cache() };
  }

  link() {
    let httpLink = super.link();
    // Middleware
    let authMiddleware = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: this.authService?.token ? `Bearer ${this.authService.token}` : "",
        }
      };
    });

    // Afterware
    const resetToken = onError(({ networkError }) => {
      if (networkError && (networkError as ServerError).statusCode === 401) {
        this.authService?.logout();
      }
    });

    const authFlowLink = authMiddleware.concat(resetToken);

    return authFlowLink.concat(httpLink);
  }
}

// Don't remove this declaration: this is what enables TypeScript to resolve
// this service using `Owner.lookup('service:authenticated-apollo')`, as well
// as to check when you pass the service name as an argument to the decorator,
// like `@service('authenticated-apollo') declare altName: AuthenticatedApolloService;`.
declare module '@ember/service' {
  interface Registry {
    'authenticated-apollo': AuthenticatedApolloService;
  }
}
