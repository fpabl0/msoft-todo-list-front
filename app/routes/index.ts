import Route from '@ember/routing/route';
import type RouterService from '@ember/routing/router-service';
import type Transition from '@ember/routing/transition';
import { service } from '@ember/service';

export default class IndexRoute extends Route {
  @service router?: RouterService;

  beforeModel(transition: Transition) {
    console.log('TODO redirect');
    this.router?.transitionTo('/login');
  }
}
