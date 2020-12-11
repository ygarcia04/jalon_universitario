import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupdriveComponent } from './signupdrive.component';

describe('SignupdriveComponent', () => {
  let component: SignupdriveComponent;
  let fixture: ComponentFixture<SignupdriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupdriveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupdriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
