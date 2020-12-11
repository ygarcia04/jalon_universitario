import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JalonesPendientesComponent } from './jalones-pendientes.component';

describe('JalonesPendientesComponent', () => {
  let component: JalonesPendientesComponent;
  let fixture: ComponentFixture<JalonesPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JalonesPendientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JalonesPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
