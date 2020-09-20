import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersManagementComponent } from './members-management.component';

describe('MembersManagementComponent', () => {
  let component: MembersManagementComponent;
  let fixture: ComponentFixture<MembersManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
