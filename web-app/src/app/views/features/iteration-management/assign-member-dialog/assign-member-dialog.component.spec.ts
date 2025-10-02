import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignMemberDialogComponent } from './assign-member-dialog.component';

describe('AssignMemberDialogComponent', () => {
  let component: AssignMemberDialogComponent;
  let fixture: ComponentFixture<AssignMemberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [AssignMemberDialogComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignMemberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
