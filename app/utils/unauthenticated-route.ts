import Route from '@ember/routing/route';
import { service } from '@ember/service';

import type RouterService from '@ember/routing/router-service';
import type AuthService from 'todo-list/services/auth';

export class UnauthenticatedRoute extends Route {
  @service router?: RouterService;
  @service('auth') authService?: AuthService;

  beforeModel() {
    if (this.authService!.isLoggedIn) {
      this.router!.replaceWith('home');
    }
  }
}
