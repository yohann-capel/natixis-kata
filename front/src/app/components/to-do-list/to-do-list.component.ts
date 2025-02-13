import { Component, inject, signal, WritableSignal } from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { FormsModule } from '@angular/forms';
import { TaskCardComponent } from './task-card/task-card.component';
import { Task } from '../../models/task';
import { ActivatedRoute } from '@angular/router';
import { EmitTaskUpdate } from '../../models/update-task-emit';
import { Priority } from '../../models/priority';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-to-do-list',
  imports: [FormsModule, TaskCardComponent, CommonModule],
  templateUrl: './to-do-list.component.html',
  styleUrl: './to-do-list.component.css',
})
export class ToDoListComponent {
  private taskService = inject(TaskService)
  private activatedRoute = inject(ActivatedRoute)

  newTaskLabel = '';
  isCompleted = false;
  priority: Priority = Priority.LOW

  tasksList: WritableSignal<Task>[] = this.activatedRoute.snapshot.data['taskList']

  getPriorityKeys() {
    return Object.keys(Priority)
  }

  createNewTask() {
    this.taskService
      .createTask({
        label: this.newTaskLabel,
        complete: this.isCompleted,
        priority: this.priority
      })
      .pipe(map(taskRes => signal<Task>(taskRes)))
      .subscribe({
        next: (data) => this.tasksList.push(data),
        error: (err) => alert(err.error),
      });
  }

  getAllTasks() {
    this.taskService
      .getAll()
      .subscribe((data) => {
        this.tasksList = data;
      });
  }

  updateTaskInList(task: EmitTaskUpdate) {
    this.taskService
      .updateTask(task.id, { complete: task.complete })
      .subscribe({
        next: (data) => {
          let toUpdate: WritableSignal<Task> | undefined = this.tasksList.find(
            taskItem => taskItem().id === task.id
          );

          if (toUpdate !== undefined) {
            toUpdate.update(current => ({...current, complete: data.complete}))
          };
        },
        error: (err) => alert(err.error),
      });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasksList = this.tasksList.filter((elTask) => elTask().id !== id);
      },
      error: (err) => alert(err.error),
    });
  }

  orderById() {
    this.tasksList.sort((taskA, taskB) => taskA().id - taskB().id)
  }

  orderByPriority() {
    this.tasksList.sort((taskA, taskB) => Object.keys(Priority).indexOf(taskA().priority) - Object.keys(Priority).indexOf(taskB().priority))
  }
}
