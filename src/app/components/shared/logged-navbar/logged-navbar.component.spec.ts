import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedNavbarComponent } from './logged-navbar.component';

describe('LoggedNavbarComponent', () => {
  let component: LoggedNavbarComponent;
  let fixture: ComponentFixture<LoggedNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoggedNavbarComponent]
    });
    fixture = TestBed.createComponent(LoggedNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
