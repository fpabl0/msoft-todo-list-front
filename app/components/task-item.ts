import Component from '@glimmer/component';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import type { Task } from 'todo-list/bmodels/task';
import { service } from "@ember/service";
import type TasksService from "todo-list/services/tasks";

export interface TaskItemSignature {
  // The arguments accepted by the component
  Args: {
    task: Task;
  };
  // Any blocks yielded by the component
  Blocks: {
    default: [];
  };
  // The element to which `...attributes` is applied in the component template
  Element: null;
}

export default class TaskItemComponent extends Component<TaskItemSignature> {
  @service('tasks') tasksService?: TasksService;
  @tracked editMode = false;
  @tracked updatedTaskDesc = this.args.task.description;

  get disableUpdateBtn() {
    if (this.updatedTaskDesc.trim() == '') {
      return true;
    }
    return false;
  }

  @action
  onEnterEditMode() {
    this.updatedTaskDesc = this.args.task.description;
    this.editMode = true;
    setTimeout(() => {
      document.getElementById(`update-task-input-${this.args.task.id}`)?.focus();
    }, 50);
  }

  @action
  onExitEditMode() {
    this.editMode = false;
  }

  @action
  async onUpdateTask() {
    if (this.updatedTaskDesc.trim() == '') return;
    await this.tasksService?.updateTaskDesc(this.args.task.id, this.updatedTaskDesc);
    this.onExitEditMode();
  }

  @action
  onUpdateDescInputKeyPress(ev: KeyboardEvent) {
    if (ev.key == 'Enter') {
      this.onUpdateTask();
    }
  }

  @action
  onChangeTaskDescInput(ev: Event) {
    assert(
      `Expected input event handler to be used an an 'input' element,`,
      ev.target instanceof HTMLInputElement,
    );
    this.updatedTaskDesc = ev.target.value;
  }

  @action
  async onDeleteTask() {
    await this.tasksService?.deleteTask(this.args.task.id);
  }

  @action
  async onToggleDoneTask(ev: Event) {
    assert(
      `Expected input event handler to be used an an 'input' element,`,
      ev.target instanceof HTMLInputElement,
    );
    await this.tasksService?.updateTaskComplete(this.args.task.id, ev.target.checked);
  }
}
