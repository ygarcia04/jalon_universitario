import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationComponentsComponent } from './verification-components.component';

describe('VerificationComponentsComponent', () => {
  let component: VerificationComponentsComponent;
  let fixture: ComponentFixture<VerificationComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificationComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
