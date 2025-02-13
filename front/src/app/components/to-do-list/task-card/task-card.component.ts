import { Component, inject, input, output, Signal } from '@angular/core';
import { Task } from '../../../models/task';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmitTaskUpdate } from '../../../models/update-task-emit';

@Component({
  selector: 'app-task-card',
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.css',
})
export class TaskCardComponent {
  // @Input() task!: Task;
  task = input.required<Task>()
  updateTask = output<EmitTaskUpdate>()
  deleteTask = output<number>()

  private router = inject(Router)

  completeTask() {
    this.updateTask.emit({id: this.task().id, complete: !this.task().complete});
  }

  editTask() {
    this.router.navigate([`task/${this.task().id}`])
  }

  emitDeleteTask() {
    this.deleteTask.emit(this.task().id);
  }
}
