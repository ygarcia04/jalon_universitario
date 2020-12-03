import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupConComponent } from './signup-con.component';

describe('SignupConComponent', () => {
  let component: SignupConComponent;
  let fixture: ComponentFixture<SignupConComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupConComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupConComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
