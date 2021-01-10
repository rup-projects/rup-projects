import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseManagementComponent } from './phase-management.component';

describe('PhaseManagementComponent', () => {
  let component: PhaseManagementComponent;
  let fixture: ComponentFixture<PhaseManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhaseManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
