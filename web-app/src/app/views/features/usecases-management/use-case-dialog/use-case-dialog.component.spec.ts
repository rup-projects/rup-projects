import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCaseDialogComponent } from './use-case-dialog.component';

describe('UseCaseDialogComponent', () => {
  let component: UseCaseDialogComponent;
  let fixture: ComponentFixture<UseCaseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [UseCaseDialogComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseCaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
