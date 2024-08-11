import Route from '@ember/routing/route';
import { service } from '@ember/service';
import type TasksService from 'todo-list/services/tasks';
import { Task } from 'todo-list/bmodels/task';

export default class HomeRoute extends Route {
  @service('tasks') tasksService?: TasksService;

  async model() {
    await this.tasksService?.loadTasks([
      new Task(1, { description: 'Comprar galletas', completed: false }),
      new Task(2, { description: 'Vender radio', completed: true }),
    ]);
  }
}
