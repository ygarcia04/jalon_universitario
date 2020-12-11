import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversBloqComponent } from './drivers-bloq.component';

describe('DriversBloqComponent', () => {
  let component: DriversBloqComponent;
  let fixture: ComponentFixture<DriversBloqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriversBloqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriversBloqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
