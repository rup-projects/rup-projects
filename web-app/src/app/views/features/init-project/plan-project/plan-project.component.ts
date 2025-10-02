import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material/stepper';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Phase} from '../../../../../logic/models/phase';
import {Project, CreateProjectDto} from '../../../../../logic/models/project';
import {ProjectService} from '../../../../controllers/project.service';
import {ProjectDateValidator} from './project-date.validator';
import {filter, first, tap} from 'rxjs/operators';

@Component({
  selector: 'app-plan-project',
  templateUrl: './plan-project.component.html',
  styleUrls: ['./plan-project.component.scss']

})
export class PlanProjectComponent implements OnInit {
  prePlannedProject$: Observable<Project>;
  basicInfoFormGroup: UntypedFormGroup;
  iterationSizeFormGroup: UntypedFormGroup;
  numberOfIterations: number;
  phases: Observable<Phase[]>;
  displayedColumns: string[] = ['type', 'startDate', 'endDate'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  readonly iterationSizeFormGroupControlName = 'numberOfIterations';

  constructor(
    private projectService: ProjectService,
    private router: Router, private formBuilder: UntypedFormBuilder
  ) {
     this.prePlannedProject$ = this.projectService.getPrePlannedProject$();
     this.prePlannedProject$.pipe(filter(prePlannedProject => !(!prePlannedProject))).subscribe(prePlannedProject =>
       this.iterationSizeFormGroup.controls[this.iterationSizeFormGroupControlName].setValue(prePlannedProject.numberOfIterations)
     );
  }

  ngOnInit(): void {
    const start = new Date();
    const end = new Date();
    start.setDate(start.getDate() + 1);
    end.setDate(end.getDate() + 120);
    this.basicInfoFormGroup = this.formBuilder.group({
      startDate: [start, [Validators.required, ProjectDateValidator.afterNow]],
      endDate: [end, [Validators.required]],
      cost: [100, [Validators.required, Validators.min(0)]]
    });
    this.iterationSizeFormGroup = this.formBuilder.group({
      numberOfIterations: ['', Validators.required]
    });
  }

  public async prePlanProject(): Promise<void> {
    const planProject: CreateProjectDto = {
      ...this.basicInfoFormGroup.getRawValue(),
      numberOfIterations: this.iterationSizeFormGroup.get(this.iterationSizeFormGroupControlName).value as number
    };
    await this.projectService.prePlanProject(planProject);
  }

  public toIterationsSizeStep(stepper: MatStepper): void {
    this.projectService.getCompletedOperationPrePlanProject$().pipe(
      filter(resultOperation => resultOperation === true ), first())
      .subscribe(resultOperation => {
        stepper.next();
      });
    this.projectService.prePlanProject(this.basicInfoFormGroup.getRawValue());
  }

  public planProject(): void {
    this.projectService.getCompletedOperationPlanProject$().pipe(
      filter(resultOperation => resultOperation === true ))
      .subscribe(resultOperation => {
        this.router.navigateByUrl('/project-management');
      });

    const planProject: CreateProjectDto = {
      ...this.basicInfoFormGroup.getRawValue(),
      numberOfIterations: this.iterationSizeFormGroup.get(this.iterationSizeFormGroupControlName).value as number
    };
    this.projectService.planProject(planProject);

  }

  public backToBasicInfoStep(stepper: MatStepper): void {
    stepper.previous();
  }

  async cancelPlanProject(): Promise<void> {
    await this.router.navigateByUrl('/');
  }
}
