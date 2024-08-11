import { service } from "@ember/service";
import Component from '@glimmer/component';
import type TasksService from "todo-list/services/tasks";

export interface TaskListSignature {
  // The arguments accepted by the component
  Args: {};
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class TaskListComponent extends Component<TaskListSignature> {
  @service('tasks') tasksService?: TasksService;

  get haveNoTasks() {
    return this.tasksService?.tasks.length == 0;
  }
}
