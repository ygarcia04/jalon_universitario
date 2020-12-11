import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JalonesDriverComponent } from './jalones-driver.component';

describe('JalonesDriverComponent', () => {
  let component: JalonesDriverComponent;
  let fixture: ComponentFixture<JalonesDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JalonesDriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JalonesDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
