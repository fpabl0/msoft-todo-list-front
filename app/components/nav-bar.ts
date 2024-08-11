import { action } from '@ember/object';
import Component from '@glimmer/component';

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
  get getTitle() {
    const name = 'Juan Pérez';
    return `Tareas de ${name}`;
  }

  @action
  onLogout() {
    console.log('TODO logout action');
  }
}
