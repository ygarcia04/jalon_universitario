import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersActComponent } from './users-act.component';

describe('UsersActComponent', () => {
  let component: UsersActComponent;
  let fixture: ComponentFixture<UsersActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersActComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
