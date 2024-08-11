import { tracked } from "@glimmer/tracking";

export class Task {
  id: number;
  @tracked description: string;
  @tracked completed: boolean;

  constructor(id: number, data: { description: string, completed: boolean; } = { description: "", completed: false }) {
    this.id = id;
    this.description = data.description;
    this.completed = data.completed;
  }
}