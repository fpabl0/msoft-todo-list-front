import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

import Swal from 'sweetalert2';

import type TasksService from 'todo-list/services/tasks';

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
    return this.newTaskDesc.trim() === '';
  }

  @action
  async onAddTask() {
    if (this.newTaskDesc.trim() === '') return;
    try {
      await this.tasksService?.createTask(this.newTaskDesc);
      this.newTaskDesc = '';
      document.getElementById('add-task-input')?.blur();
    } catch (e) {
      Swal.fire({ title: 'Error', text: `${e}`, icon: 'error' });
    }
  }

  @action
  onEnter() {
    this.onAddTask();
  }
}
