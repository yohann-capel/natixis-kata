import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEditComponent } from './task-edit.component';
import { TaskService } from '../../services/task/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task';
import { of, throwError } from 'rxjs';
import { Priority } from '../../models/priority';

describe('TaskEditComponent', () => {
  let component: TaskEditComponent;
  let fixture: ComponentFixture<TaskEditComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [TaskEditComponent, FormsModule],
      providers: [{
        provide: TaskService,
        useValue: jasmine.createSpyObj('TaskService', ['updateTask'])
      }, {
        provide: Router,
        useValue: jasmine.createSpyObj('Router', ['navigate'])
      }, {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            data: {
              task: {id: 1, label: 'test', complete: false, priority: Priority.HIGH} as Task
            }
          }
        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskEditComponent);
    component = fixture.componentInstance;

    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update task and navigate', () => {
    taskService.updateTask.and.returnValue(of({} as Task))

    component.updateTask()

    expect(taskService.updateTask).toHaveBeenCalledWith(1, {label: 'test', complete: false, priority: Priority.HIGH})
    expect(router.navigate).toHaveBeenCalledWith([''])
  })

  it('should alert on error', () => {
    const errorMessage = { error: 'message' }
    taskService.updateTask.and.returnValue(throwError(() => errorMessage))
    
    spyOn(window, 'alert')

    component.updateTask()

    expect(window.alert).toHaveBeenCalledWith('message')
  })
});
