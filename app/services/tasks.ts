import { Task } from 'todo-list/bmodels/task';

import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TasksService extends Service {
  @tracked tasks: Task[] = [];

  async loadTasks(initial?: Task[]): Promise<void> {
    if (initial) this.tasks = initial;
  }

  async createTask(desc: string): Promise<void> {
    console.log(`TODO service: create task with desc: "${desc}"`);
    this.tasks = [
      ...this.tasks,
      new Task(new Date().getMilliseconds(), { description: desc, completed: false }),
    ];
  }

  async updateTaskDesc(id: number, desc: string): Promise<void> {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index < 0) return;
    this.tasks[index]!.description = desc;
    console.log(`TODO service: update task desc to "${desc}"`);
  }

  async updateTaskComplete(id: number, complete: boolean): Promise<void> {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index < 0) return;
    this.tasks[index]!.completed = complete;
    console.log(`TODO service: update task completed to "${complete}"`);
  }

  async deleteTask(id: number): Promise<void> {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    console.log('TODO service: delete task');
  }
}

// Don't remove this declaration: this is what enables TypeScript to resolve
// this service using `Owner.lookup('service:tasks')`, as well
// as to check when you pass the service name as an argument to the decorator,
// like `@service('tasks') declare altName: TasksService;`.
declare module '@ember/service' {
  interface Registry {
    tasks: TasksService;
  }
}
