import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanProjectComponent } from './plan-project.component';

describe('PlanProjectComponent', () => {
  let component: PlanProjectComponent;
  let fixture: ComponentFixture<PlanProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [PlanProjectComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
