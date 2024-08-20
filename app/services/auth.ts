import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

import type ApolloService from 'ember-apollo-client/services/apollo';
import { queryManager } from 'ember-apollo-client';
import { storageFor } from 'ember-local-storage';
import { jwtDecode } from "jwt-decode";

import loginMutation from 'todo-list/gql/mutation/login';
import registerMutation from "todo-list/gql/mutation/register";

export default class AuthService extends Service {
  @queryManager apollo?: ApolloService;
  @storageFor('auth') authStorage?: any;

  @tracked token: string | null = null;
  userName: string | null = null;

  constructor() {
    super(...arguments);
    this.loadCreds();
  }

  get isLoggedIn() {
    return this.token !== null;
  }

  async login(email: string, password: string): Promise<void> {
    const data = await this.apollo?.mutate<any>({
      mutation: loginMutation,
      variables: { email, password },
    });
    const err = data.userAccessTokenCreate.error;
    if (err !== null) {
      throw err.message;
    }
    this.token = data.userAccessTokenCreate.userAccessToken;
    this.userName = data.userAccessTokenCreate.user.name;
    this.set<any>("authStorage.token", this.token);
  }

  async register(name: string, email: string, password: string): Promise<void> {
    const data = await this.apollo?.mutate<any>({
      mutation: registerMutation,
      variables: { name, email, password },
    });
    const err = data.userCreate.error;
    if (err !== null) {
      throw err.message;
    }
  }

  async logout(): Promise<void> {
    this.token = null;
    this.userName = null;
    this.authStorage.clear();
  }

  loadCreds() {
    this.token = this.authStorage.get('token') ?? null;
    this.userName = null;
    if (this.token === null) return;
    const claims = jwtDecode<{ username: string; }>(this.token);
    this.userName = claims.username;
  }
}

// Don't remove this declaration: this is what enables TypeScript to resolve
// this service using `Owner.lookup('service:auth')`, as well
// as to check when you pass the service name as an argument to the decorator,
// like `@service('auth') declare altName: AuthService;`.
declare module '@ember/service' {
  interface Registry {
    auth: AuthService;
  }
}
