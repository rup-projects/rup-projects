import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitProjectComponent } from './init-project.component';

describe('InitProjectComponent', () => {
  let component: InitProjectComponent;
  let fixture: ComponentFixture<InitProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    declarations: [InitProjectComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
