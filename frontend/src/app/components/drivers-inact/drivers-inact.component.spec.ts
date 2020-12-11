import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversInactComponent } from './drivers-inact.component';

describe('DriversInactComponent', () => {
  let component: DriversInactComponent;
  let fixture: ComponentFixture<DriversInactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversInactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversInactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
