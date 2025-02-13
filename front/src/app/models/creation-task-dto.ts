import { Priority } from "./priority";

export interface CreationTaskDto {
  label: string;
  complete: boolean;
  priority: Priority
}
