import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { map, Observable, of } from 'rxjs';
import { Task } from '../../models/task';
import { CreationTaskDto } from '../../models/creation-task-dto';
import { InputTaskDto } from '../../models/input-task-dto';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private api: string = environment.apiUrl + environment.apiVersion + '/tasks';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<WritableSignal<Task>[]> {
    return this
      .httpClient
      .get<Task[]>(this.api)
      .pipe(
        map(taskList => { return taskList.map(task => signal<Task>(task))})
      )
  }

  getBytId(taskId: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.api}/${taskId}`);
  }

  getToDo(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.api}/todo`);
  }

  createTask(newTask: CreationTaskDto): Observable<Task> {
    return this.httpClient.post<Task>(this.api, newTask);
  }

  updateTask(taskId: number, inputTask: InputTaskDto): Observable<Task> {
    return this.httpClient.patch<Task>(`${this.api}/${taskId}`, inputTask);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.api}/${taskId}`);
  }
}
