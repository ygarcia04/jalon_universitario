import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JalonesPendientesDriverComponent } from './jalones-pendientes-driver.component';

describe('JalonesPendientesDriverComponent', () => {
  let component: JalonesPendientesDriverComponent;
  let fixture: ComponentFixture<JalonesPendientesDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JalonesPendientesDriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JalonesPendientesDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
