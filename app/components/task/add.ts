import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { service } from "@ember/service";

import type TasksService from "todo-list/services/tasks";

export interface TaskAddSignature {
  // The arguments accepted by the component
  Args: {};
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class TaskAddComponent extends Component<TaskAddSignature> {
  @service('tasks') tasksService?: TasksService;
  @tracked newTaskDesc = '';

  get disableAddBtn() {
    return this.newTaskDesc.trim() === "";
  }

  @action
  async onAddTask() {
    if (this.newTaskDesc.trim() === '') return;
    await this.tasksService?.createTask(this.newTaskDesc);
    this.newTaskDesc = '';
    document.getElementById('add-task-input')?.blur(); // TODO should blur?
  }

  @action
  onEnter() {
    this.onAddTask();
  }
}
