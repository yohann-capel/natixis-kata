import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardComponent } from './task-card.component';
import { Router } from '@angular/router';
import { Task } from '../../../models/task';
import { Priority } from '../../../models/priority';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;
  let router: jasmine.SpyObj<Router>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardComponent],
      providers: [{
        provide: Router,
        useValue: jasmine.createSpyObj('Router', ['navigate'])
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
    
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>
    fixture.componentRef.setInput('task', {id: 1, label: 'label', complete: false, priority: Priority.LOW} as Task)


    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit task update event', () => {
    spyOn(component.updateTask, 'emit')
    
    component.completeTask()

    expect(component.updateTask.emit).toHaveBeenCalledWith({id: 1, complete: true})
  })

  it('should navigate to edittask', () => {
    component.editTask()

    expect(router.navigate).toHaveBeenCalledWith(['task/1'])
  })

  it('should emit when delete task called', () => {
    spyOn(component.deleteTask, 'emit')

    component.emitDeleteTask()

    expect(component.deleteTask.emit).toHaveBeenCalledWith(1)
  })
});
