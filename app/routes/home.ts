import { service } from '@ember/service';

import { Task } from 'todo-list/bmodels/task';
import { AuthenticatedRoute } from 'todo-list/utils/authenticated-route';

import type TasksService from 'todo-list/services/tasks';

export default class HomeRoute extends AuthenticatedRoute {
  @service('tasks') tasksService?: TasksService;

  async model() {
    await this.tasksService?.loadTasks([
      new Task(1, { description: 'Comprar galletas', completed: false }),
      new Task(2, { description: 'Vender radio', completed: true }),
    ]);
  }
}
