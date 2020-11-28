import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersInactComponent } from './users-inact.component';

describe('UsersInactComponent', () => {
  let component: UsersInactComponent;
  let fixture: ComponentFixture<UsersInactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersInactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersInactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
