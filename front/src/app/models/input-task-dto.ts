import { Priority } from "./priority";

export interface InputTaskDto {
  label?: string,
  complete?: boolean,
  priority?: Priority
}
