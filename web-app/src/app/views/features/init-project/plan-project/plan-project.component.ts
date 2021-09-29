import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatStepper} from '@angular/material/stepper';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Phase} from '../../../../../logic/models/phase';
import {Project, CreateProjectDto} from '../../../../../logic/models/project';
import {ProjectService} from '../../../../controllers/project.service';
import {ProjectDateValidator} from './project-date.validator';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-plan-project',
  templateUrl: './plan-project.component.html',
  styleUrls: ['./plan-project.component.scss']

})
export class PlanProjectComponent implements OnInit {
  project$: Observable<Project>;
  basicInfoFormGroup: FormGroup;
  iterationSizeFormGroup: FormGroup;
  numberOfIterations: number;
  phases: Observable<Phase[]>;
  displayedColumns: string[] = ['type', 'startDate', 'endDate'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  readonly iterationSizeFormGroupControlName = 'numberOfIterations';

  constructor(
    private projectService: ProjectService,
    private router: Router, private formBuilder: FormBuilder
  ) {
     this.project$ = this.projectService.getViewModel().getStateValue().pipe(map(value => value.data));
  }
git
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

  public async refreshProject(): Promise<void> {
    const planProject: CreateProjectDto = {
      ...this.basicInfoFormGroup.getRawValue(),
      numberOfIterations: this.iterationSizeFormGroup.get(this.iterationSizeFormGroupControlName).value as number
    };
    await this.projectService.prePlanProject(planProject);
  }

  public async toIterationsSizeStep(stepper: MatStepper): Promise<void> {
    this.projectService.prePlanProject(this.basicInfoFormGroup.getRawValue())
      .then( () => {
        this.project$ = this.projectService.getViewModel().getStateValue().pipe(map( val => val.data ));
        this.project$.subscribe(project =>
          this.iterationSizeFormGroup.controls[this.iterationSizeFormGroupControlName].setValue(project.numberOfIterations));
        stepper.next();
      });
  }

  public backToBasicInfoStep(stepper: MatStepper): void {
    stepper.previous();
  }

  async cancelPlanProject(): Promise<void> {
    await this.router.navigateByUrl('/');
  }

  planProject(): void {
    const planProject: CreateProjectDto = {
      ...this.basicInfoFormGroup.getRawValue(),
      numberOfIterations: this.iterationSizeFormGroup.get(this.iterationSizeFormGroupControlName).value as number
    };
    this.projectService.planProject(planProject).then( () => this.router.navigateByUrl('/project-management') );
  }
}
