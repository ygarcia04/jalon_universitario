import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JalonesComponent } from './jalones.component';

describe('JalonesComponent', () => {
  let component: JalonesComponent;
  let fixture: ComponentFixture<JalonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JalonesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JalonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
