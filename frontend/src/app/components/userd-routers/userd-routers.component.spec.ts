import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdRoutersComponent } from './userd-routers.component';

describe('UserdRoutersComponent', () => {
  let component: UserdRoutersComponent;
  let fixture: ComponentFixture<UserdRoutersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserdRoutersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdRoutersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
