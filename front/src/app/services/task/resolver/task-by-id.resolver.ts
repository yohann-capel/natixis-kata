import { ResolveFn, Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { Task } from '../../../models/task';
import { TaskService } from '../task.service';
import { inject } from '@angular/core';

export const taskByIdResolver: ResolveFn<Task> = (route, state):  Observable<Task> => {
  const taskService = inject(TaskService)
  const router = inject(Router)

  return taskService.getBytId(route.params['id']).pipe(catchError((err) => {
    alert(err.error)
    router.navigate([''])
    throw err
  }))
};
