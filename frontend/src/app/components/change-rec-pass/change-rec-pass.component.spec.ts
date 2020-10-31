import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRecPassComponent } from './change-rec-pass.component';

describe('ChangeRecPassComponent', () => {
  let component: ChangeRecPassComponent;
  let fixture: ComponentFixture<ChangeRecPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeRecPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeRecPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
