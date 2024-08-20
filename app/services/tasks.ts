import { Task } from 'todo-list/bmodels/task';

import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { queryManager } from "ember-apollo-client";
import type AuthenticatedApolloService from "./authenticated-apollo";
import myTasksQuery from "todo-list/gql/queries/my-tasks";
import createTaskMutation from "todo-list/gql/mutations/create-task";
import updateTaskMutation from "todo-list/gql/mutations/update-task";
import deleteTaskMutation from "todo-list/gql/mutations/delete-task";

export default class TasksService extends Service {
  @queryManager({ service: "authenticated-apollo" }) apollo?: AuthenticatedApolloService;
  @tracked tasks: Task[] = [];

  async loadTasks(initial?: Task[]): Promise<void> {
    if (initial) {
      this.tasks = initial;
      return;
    }
    const data = await this.apollo?.query<any>({ query: myTasksQuery, fetchPolicy: 'network-only' });
    this.tasks = (data.currentUser.tasks as any[]).map((d) => {
      return new Task(d.id, {
        description: d.description,
        completed: d.completed,
      });
    });
  }

  async createTask(desc: string): Promise<void> {
    const data = await this.apollo?.mutate<any>({
      mutation: createTaskMutation,
      variables: { description: desc }
    });
    const err = data.taskCreate.error;
    if (err !== null) {
      throw err;
    }
    const createdTask = data.taskCreate.task;
    this.tasks = [
      ...this.tasks,
      new Task(createdTask.id, {
        description: createdTask.description,
        completed: createdTask.completed,
      }),
    ];
  }

  async updateTaskDesc(id: number, desc: string): Promise<void> {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index < 0) return;
    const data = await this.apollo?.mutate<any>({
      mutation: updateTaskMutation,
      variables: { taskId: id, description: desc }
    });
    const err = data.taskUpdate.error;
    if (err !== null) {
      throw err;
    }
    this.tasks[index]!.description = desc;
  }

  async updateTaskComplete(id: number, complete: boolean): Promise<void> {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index < 0) return;
    const data = await this.apollo?.mutate<any>({
      mutation: updateTaskMutation,
      variables: { taskId: id, completed: complete }
    });
    const err = data.taskUpdate.error;
    if (err !== null) {
      throw err;
    }
    this.tasks[index]!.completed = complete;
  }

  async deleteTask(id: number): Promise<void> {
    const data = await this.apollo?.mutate<any>({
      mutation: deleteTaskMutation,
      variables: { taskId: id }
    });
    const err = data.taskDelete.error;
    if (err !== null) {
      throw err;
    }
    this.tasks = this.tasks.filter((task) => task.id !== id);
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
