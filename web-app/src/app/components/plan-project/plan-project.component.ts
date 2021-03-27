import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Project} from '../../models/project';
import {ProjectService} from '../../services/project.service';
import {CreateProjectFormGroup} from './create-project-form-group';

@Component({
  selector: 'app-plan-project',
  templateUrl: './plan-project.component.html'
})
export class PlanProjectComponent implements OnInit {

  project: Project;
  form: CreateProjectFormGroup = new CreateProjectFormGroup();

  constructor(private projectService: ProjectService, private router: Router) {
  }

  ngOnInit(): void {
  }



  next(): void {
    if (!this.project) {
      this.planProject();
    } else {
      this.router.navigateByUrl('/project-management').then();
    }
  }

  planProject(): void {
    this.projectService
      .planProject(this.form.getRawValue())
      .subscribe(project => this.project = project);
  }

  cancel(): void {
    this.router.navigateByUrl('/').then();
  }
}
