import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoListComponent } from './to-do-list.component';
import { TaskService } from '../../services/task/task.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Task } from '../../models/task';
import { EmitTaskUpdate } from '../../models/update-task-emit';
import { Priority } from '../../models/priority';
import { signal } from '@angular/core';

describe('ToDoListComponent', () => {
  let component: ToDoListComponent;
  let fixture: ComponentFixture<ToDoListComponent>;
  let taskService: jasmine.SpyObj<TaskService>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoListComponent],
      providers: [{
        provide: TaskService,
        useValue: jasmine.createSpyObj('TaskService', ['createTask', 'getAll', 'updateTask', 'deleteTask'])
      }, {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            data: {
              taskList: [
                signal({id: 1, label: 'test 1', complete: false, priority: Priority.LOW}),
                signal({id: 2, label: 'test 2', complete: true, priority: Priority.MEDIUM}),
                signal({id: 3, label: 'test 3', complete: false, priority: Priority.HIGH}),
              ]
            }
          }
        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoListComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a new task', () => {
    const resultTask: Task = {id:4, label: 'test 4', complete: true, priority: Priority.LOW}

    component.newTaskLabel = 'test 4'
    component.isCompleted = true
    taskService.createTask.and.returnValue(of(resultTask))

    component.createNewTask()

    expect(taskService.createTask)
    .toHaveBeenCalledWith({
      label: 'test 4',
      complete: true,
      priority: Priority.LOW
    })
    expect(component.tasksList.length).toBe(4)
    expect(component.tasksList[3]()).toBe(resultTask)
  })
  
  it('should throw an alert if title empty', () => {
    component.newTaskLabel = ''
    taskService.createTask.and.returnValue(throwError(() => ''))
    spyOn(window, 'alert')

    component.createNewTask()

    expect(window.alert).toHaveBeenCalled()
  });

  it('should retrieve all tasks and store it in taskList', () => {
    const resultTaskList = [
      signal({id: 7, label: 'test 7', complete: false, priority: Priority.LOW}),
      signal({id: 8, label: 'test 8', complete: true, priority: Priority.HIGH})
    ]
    taskService.getAll.and.returnValue(of(resultTaskList))

    component.getAllTasks()

    expect(component.tasksList.length).toBe(2)
    expect(component.tasksList[0]().id).toBe(7)
    expect(component.tasksList[1]().label).toBe('test 8')
    expect(component.tasksList).toBe(resultTaskList)
  })

  it('should update task and update the one in the list without getAll()', () => {
    const taskToUpdate: EmitTaskUpdate = {id: 1, complete: true}
    taskService.updateTask.and.returnValue(of({id: 1, label: 'test 1', complete: true} as Task))

    component.updateTaskInList(taskToUpdate)

    expect(component.tasksList[0]().complete).toBe(true)
  })

  it('should alert when id not found', () => {
    taskService.updateTask.and.returnValue(throwError(() => 'id not found'))
    spyOn(window, 'alert')

    component.updateTaskInList(component.tasksList[0]())
    
    expect(window.alert).toHaveBeenCalled()
  })

  it('should remove task from list when delete', () => {
    taskService.deleteTask.and.returnValue(of(undefined))
    
    component.deleteTask(1)

    expect(component.tasksList[0]().id).toBe(2)
  })

  it('should alert when id not found', () => {
    taskService.deleteTask.and.returnValue(throwError(() => 'id not found'))
    spyOn(window, 'alert')

    component.deleteTask(1)
    
    expect(window.alert).toHaveBeenCalled()
  })

  it('should filter by id', () => {
    component.tasksList = [
      signal({id: 3, label: '3', complete: false, priority: Priority.HIGH}),
      signal({id: 1, label: '1', complete: false, priority: Priority.LOW}),
      signal({id: 2, label: '2', complete: false, priority: Priority.MEDIUM}),
    ]

    component.orderById()

    expect(component.tasksList[0]().id).toBe(1)
    expect(component.tasksList[1]().id).toBe(2)
    expect(component.tasksList[2]().id).toBe(3)
  })

  it('should filter by id', () => {
    component.tasksList = [
      signal({id: 3, label: '3', complete: false, priority: Priority.HIGH}),
      signal({id: 1, label: '1', complete: false, priority: Priority.LOW}),
      signal({id: 2, label: '2', complete: false, priority: Priority.MEDIUM}),
    ]

    component.orderByPriority()

    expect(component.tasksList[0]().id).toBe(1)
    expect(component.tasksList[1]().id).toBe(2)
    expect(component.tasksList[2]().id).toBe(3)
  })
});
