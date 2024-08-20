import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

import type ApolloService from 'ember-apollo-client/services/apollo';
import { queryManager } from 'ember-apollo-client';
import { storageFor } from 'ember-local-storage';

import loginMutation from 'todo-list/gql/mutation/login';
import registerMutation from "todo-list/gql/mutation/register";

export default class AuthService extends Service {
  @queryManager apollo?: ApolloService;
  @storageFor('auth') authStorage?: any;

  @tracked token: string | null = null;
  userName: string | null = null;

  get isLoggedIn() {
    this.loadCreds();
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
    this.saveCreds();
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

  saveCreds() {
    this.set<any>('authStorage.user', this.userName);
    this.set<any>("authStorage.token", this.token);
  }

  loadCreds() {
    this.userName = this.authStorage.get('user') ?? null;
    this.token = this.authStorage.get('token') ?? null;
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
