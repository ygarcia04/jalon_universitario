import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversActComponent } from './drivers-act.component';

describe('DriversActComponent', () => {
  let component: DriversActComponent;
  let fixture: ComponentFixture<DriversActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversActComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
