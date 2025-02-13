import { Routes } from '@angular/router';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { taskByIdResolver } from './services/task/resolver/task-by-id.resolver';
import { getAllTasksResolver } from './services/task/resolver/get-all-tasks.resolver';

export const routes: Routes = [
  {
    path: '',
    component: ToDoListComponent,
    resolve: {
      taskList: getAllTasksResolver
    }
  },
  {
    path: 'task/:id',
    component: TaskEditComponent,
    resolve: {
      task: taskByIdResolver
    }
  },
  {
    path: '**',
    redirectTo: ''
  },
];
