import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task/task.service';
import { Task } from '../../models/task';
import { FormsModule } from '@angular/forms';
import { Priority } from '../../models/priority';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

@Component({
  selector: 'app-task-edit',
  imports: [FormsModule, CommonModule],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css'
})
export class TaskEditComponent {
  private activatedRoute = inject(ActivatedRoute)
  private taskService = inject(TaskService)
  private router = inject(Router)

  task: Task = this.activatedRoute.snapshot.data['task']

  updateTask() {
    this.taskService
    .updateTask(this.task.id, {label: this.task.label, complete: this.task.complete, priority: this.task.priority})
    .subscribe({
      next: _ => this.router.navigate(['']),
      error: err => alert(err.error)
    })
  }

  getPriorityKeys() {
    return Object.keys(Priority)
  }
}
