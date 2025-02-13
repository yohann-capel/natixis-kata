import { ResolveFn } from '@angular/router';
import { Task } from '../../../models/task';
import { inject, Signal, signal, WritableSignal } from '@angular/core';
import { TaskService } from '../task.service';
import { map, Observable } from 'rxjs';

export const getAllTasksResolver: ResolveFn<WritableSignal<Task>[]> = (route, state): Observable<WritableSignal<Task>[]> => {
  const taskService = inject(TaskService)
  return taskService.getAll()
};