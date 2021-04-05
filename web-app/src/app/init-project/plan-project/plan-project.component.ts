import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Project} from '../../shared/models/project';
import {ProjectService} from '../../shared/services/project.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {Phase} from '../../shared/models/phase';
import {MatStepper} from '@angular/material/stepper';

@Component({
  selector: 'app-plan-project',
  templateUrl: './plan-project.component.html'
})
export class PlanProjectComponent implements OnInit {
  project: Project;
  basicInfoFormGroup: FormGroup;
  iterationSizeFormGroup: FormGroup;
  numberOfIterations: number;
  phases: Observable<Phase[]>;
  displayedColumns: string[] = ['type', 'startDate', 'endDate'];
  columnsToDisplay: string[] = this.displayedColumns.slice();


  constructor(private projectService: ProjectService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.basicInfoFormGroup = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      cost: ['', Validators.required],
    });
    this.iterationSizeFormGroup = this.formBuilder.group({
      numberOfIterations: ['', Validators.required]
    });
  }

  refreshProject(): void {
    this.project.numberOfIterations = this.iterationSizeFormGroup.get('numberOfIterations').value as number;
    this.projectService.refreshProject(this.project)
      .subscribe(project => this.project = project, error => this.projectService.getOpenedProject()
        .subscribe(project => this.project = project));
  }

  toIterationsSizeStep(stepper: MatStepper): void {
    this.planProject().subscribe(project => {
      this.project = project;
      this.iterationSizeFormGroup.controls['numberOfIterations'].setValue(project.numberOfIterations);
      stepper.next();
    });
  }

  backToBasicInfoStep(stepper: MatStepper): void {
    this.projectService.deleteProject().subscribe(() => stepper.previous());
  }


  planProject(): Observable<Project> {
    return this.projectService.planProject(this.basicInfoFormGroup.getRawValue());
  }

  cancel(): void {
    this.projectService.deleteProject().subscribe(() => this.router.navigateByUrl('/').then());
  }

  save(): void {
    this.router.navigateByUrl('/project-management').then();
  }
}
