import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTodoComponent } from './new-todo.component';

describe('NewTodoComponent', () => {
  let component: NewTodoComponent;
  let fixture: ComponentFixture<NewTodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTodoComponent]
    });
    fixture = TestBed.createComponent(NewTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
