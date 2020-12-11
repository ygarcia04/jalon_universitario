import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificDriverComponent } from './verific-driver.component';

describe('VerificDriverComponent', () => {
  let component: VerificDriverComponent;
  let fixture: ComponentFixture<VerificDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificDriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
