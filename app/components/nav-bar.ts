import { action } from '@ember/object';
import type RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import type AuthService from 'todo-list/services/auth';

export interface NavBarSignature {
  // The arguments accepted by the component
  Args: {};
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class NavBarComponent extends Component<NavBarSignature> {
  @service router?: RouterService;
  @service('auth') authService?: AuthService;

  get getTitle() {
    return `Tareas de ${this.authService?.userName}`;
  }

  @action
  async onLogout() {
    await this.authService?.logout();
    this.router?.transitionTo('login');
  }
}
