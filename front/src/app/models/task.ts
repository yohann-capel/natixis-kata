import { Priority } from "./priority";

export interface Task {
  id: number,
  label: string,
  complete: boolean,
  priority: Priority
}
