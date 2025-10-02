import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCasesManagementComponent } from './use-cases-management.component';

describe('UseCasesManagementComponent', () => {
  let component: UseCasesManagementComponent;
  let fixture: ComponentFixture<UseCasesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [UseCasesManagementComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseCasesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
