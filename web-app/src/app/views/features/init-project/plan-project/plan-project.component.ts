import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Project} from '../../../../../logic/models/project';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {from, Observable} from 'rxjs';
import {Phase} from '../../../../../logic/models/phase';
import {MatStepper} from '@angular/material/stepper';
import {ProjectDateValidator} from './project-date.validator';
import {ProjectService} from '../../../../controllers/project.service';
import { PlanProjectDto } from '../../../../../logic/models/planProjectDto';

@Component({
    selector: 'app-plan-project',
    templateUrl: './plan-project.component.html',
    styleUrls: ['./plan-project.component.scss']

})
export class PlanProjectComponent implements OnInit {
    project: Project;
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

      this.projectService.getViewModel().getStateValue().subscribe(project => {
        this.project = project;
        if (project !== null) {
          this.iterationSizeFormGroup.controls[this.iterationSizeFormGroupControlName].setValue(this.project.numberOfIterations);
        }
      });

    }

    ngOnInit(): void {
        const now = new Date();
        const start = new Date();
        const end = new Date();
        start.setDate(start.getDate() + 1);
        end.setDate(end.getDate() + 120);
        this.basicInfoFormGroup = this.formBuilder.group({
            startDate: [start, [Validators.required, ProjectDateValidator.afterNow]],
            endDate: [end, [Validators.required]],
            cost: [100, [Validators.required, Validators.min(0)]],
        });
        this.iterationSizeFormGroup = this.formBuilder.group({
            numberOfIterations: ['', Validators.required]
        });
    }

  public async refreshProject(): Promise<void> {
      const planProjectDto: PlanProjectDto = {
          startDate: this.project.startDate,
          endDate: this.project.endDate,
          cost: this.project.cost,
          numberOfIterations: this.iterationSizeFormGroup.get(this.iterationSizeFormGroupControlName).value as number
      };
      await this.projectService.planProject(planProjectDto);
    }

    public async toIterationsSizeStep(stepper: MatStepper): Promise<void> {
      await this.planProject();
      stepper.next();
    }

    backToBasicInfoStep(stepper: MatStepper): void {
        from(this.projectService.deleteProject()).subscribe(() => stepper.previous());
    }

    async cancel(): Promise<void> {
      await this.projectService.deleteProject();
      await this.router.navigateByUrl('/');
    }

    async save(): Promise<void> {
      // TODO: Update itertionsize
      // this.project.numberOfIterations = this.iterationSizeFormGroup.get(this.iterationSizeFormGroupControlName).value as number;
        await this.router.navigateByUrl('/project-management');
    }

    private async planProject(): Promise<void> {
      await this.projectService.planProject(this.basicInfoFormGroup.getRawValue());
    }
}
