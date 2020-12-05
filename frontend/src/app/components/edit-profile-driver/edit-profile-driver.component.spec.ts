import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileDriverComponent } from './edit-profile-driver.component';

describe('EditProfileDriverComponent', () => {
  let component: EditProfileDriverComponent;
  let fixture: ComponentFixture<EditProfileDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfileDriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
