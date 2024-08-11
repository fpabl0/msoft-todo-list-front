import { action } from '@ember/object';
import type RouterService from '@ember/routing/router-service';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import { FieldData, FormData } from 'todo-list/bmodels/form-data';
import type AuthService from 'todo-list/services/auth';
import appValidators from 'todo-list/validators/app-validators';

export interface AuthRegisterFormSignature {
  // The arguments accepted by the component
  Args: {};
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class AuthRegisterFormComponent extends Component<AuthRegisterFormSignature> {
  @service router?: RouterService;
  @service('auth') authService?: AuthService;

  formData = new FormData<'name' | 'email' | 'password' | 'confirmPassword'>({
    name: new FieldData({ validators: [appValidators.required()] }),
    email: new FieldData({
      validators: [appValidators.required(), appValidators.email()],
    }),
    password: new FieldData({
      validators: [appValidators.required(), appValidators.minLength(6)],
    }),
    confirmPassword: new FieldData({}),
  });

  constructor(owner: any, args: AuthRegisterFormSignature['Args']) {
    super(owner, args);
    this.formData.fields.confirmPassword.validators = [
      this.validateConfirmPassword.bind(this),
    ];
  }

  validateConfirmPassword(v: string) {
    if (this.formData.fields.password.value !== v) {
      return 'Las contraseñas deben coincidir.';
    }
    return null;
  }

  @action
  async onRegister(ev: Event) {
    ev.preventDefault();
    if (!this.formData.isValid({ force: true })) {
      return;
    }
    try {
      await this.authService?.register(
        this.formData.fields.name.value,
        this.formData.fields.email.value,
        this.formData.fields.password.value,
      );
      this.router?.transitionTo('login');
    } catch (e) {
      // TODO
    }
  }
}
