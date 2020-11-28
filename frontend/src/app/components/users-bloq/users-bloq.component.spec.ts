import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersBloqComponent } from './users-bloq.component';

describe('UsersBloqComponent', () => {
  let component: UsersBloqComponent;
  let fixture: ComponentFixture<UsersBloqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersBloqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersBloqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
