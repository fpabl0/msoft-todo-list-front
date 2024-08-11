import Service from "@ember/service";
import type { TestContext } from "@ember/test-helpers";

type ServiceParams = {
  onLoadTasks?: () => Promise<void>;
  onCreateTask?: (desc: string) => Promise<void>;
  onUpdateTaskDesc?: (id: number, desc: string) => Promise<void>;
  onUpdateTaskComplete?: (id: number, complete: boolean) => Promise<void>;
  onDeleteTask?: (id: number) => Promise<void>;
};

export class MockTasksService extends Service {

  static registerFor(c: TestContext) {
    c.owner.register('service:tasks', MockTasksService);
  }

  static instanceFor(c: TestContext) {
    return (c.owner.lookup('service:tasks') as any) as MockTasksService;
  }

  onLoadTasks?: () => Promise<void>;
  onCreateTask?: (desc: string) => Promise<void>;
  onUpdateTaskDesc?: (id: number, desc: string) => Promise<void>;
  onUpdateTaskComplete?: (id: number, complete: boolean) => Promise<void>;
  onDeleteTask?: (id: number) => Promise<void>;

  constructor(params: ServiceParams) {
    super();
    this.onLoadTasks = params.onLoadTasks;
    this.onCreateTask = params.onCreateTask;
    this.onUpdateTaskDesc = params.onUpdateTaskDesc;
    this.onUpdateTaskComplete = params.onUpdateTaskComplete;
    this.onDeleteTask = params.onDeleteTask;
  }

  async loadTasks(): Promise<void> {
    if (this.onLoadTasks !== undefined) this.onLoadTasks!();
  }

  async createTask(desc: string): Promise<void> {
    if (this.onCreateTask !== undefined) this.onCreateTask!(desc);
  }

  async updateTaskDesc(id: number, desc: string): Promise<void> {
    if (this.onUpdateTaskDesc !== undefined) this.onUpdateTaskDesc!(id, desc);
  }

  async updateTaskComplete(id: number, complete: boolean): Promise<void> {
    if (this.onUpdateTaskComplete !== undefined) this.onUpdateTaskComplete!(id, complete);
  }

  async deleteTask(id: number): Promise<void> {
    if (this.onDeleteTask !== undefined) this.onDeleteTask!(id);
  }

  reset() {
    this.onLoadTasks = undefined;
    this.onCreateTask = undefined;
    this.onUpdateTaskDesc = undefined;
    this.onUpdateTaskComplete = undefined;
    this.onDeleteTask = undefined;
  }
}