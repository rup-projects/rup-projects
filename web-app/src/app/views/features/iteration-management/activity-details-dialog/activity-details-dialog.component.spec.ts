import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDetailsDialogComponent } from './activity-details-dialog.component';

describe('ActivityDetailsDialogComponent', () => {
  let component: ActivityDetailsDialogComponent;
  let fixture: ComponentFixture<ActivityDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [ActivityDetailsDialogComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
