import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReestimateHoursDialogComponent } from './reestimate-hours-dialog.component';

describe('ReestimateHoursDialogComponent', () => {
  let component: ReestimateHoursDialogComponent;
  let fixture: ComponentFixture<ReestimateHoursDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ReestimateHoursDialogComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReestimateHoursDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
