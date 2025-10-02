import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IterationManagementComponent } from './iteration-management.component';

describe('IterationManagementComponent', () => {
  let component: IterationManagementComponent;
  let fixture: ComponentFixture<IterationManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [IterationManagementComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IterationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
