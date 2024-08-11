import { action } from '@ember/object';
import type RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { FieldData, FormData } from 'todo-list/bmodels/form-data';
import type AuthService from 'todo-list/services/auth';
import appValidators from 'todo-list/validators/app-validators';

export interface AuthLoginFormSignature {
  // The arguments accepted by the component
  Args: {};
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class AuthLoginFormComponent extends Component<AuthLoginFormSignature> {
  @service router?: RouterService;
  @service('auth') authService?: AuthService;

  formData = new FormData<'email' | 'password'>({
    email: new FieldData({
      validators: [appValidators.required(), appValidators.email()],
    }),
    password: new FieldData({
      validators: [appValidators.required(), appValidators.minLength(6)],
    }),
  });

  @action
  async onLogin(ev: Event) {
    ev.preventDefault();
    if (!this.formData.isValid({ force: true })) {
      return;
    }
    try {
      await this.authService!.login(
        this.formData.fields.email.value,
        this.formData.fields.password.value,
      );
      this.router!.transitionTo('home');
    } catch (e) {
      // TODO
    }
  }
}
