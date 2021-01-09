import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { CreateProjectFormGroup } from './create-project-form-group';

@Component({
  selector: 'app-plan-project',
  templateUrl: './plan-project.component.html'
})
export class PlanProjectComponent implements OnInit {

  form: CreateProjectFormGroup = new CreateProjectFormGroup();

  project: Project;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
  }

  planProject(): void {
    this.projectService
      .planProject(this.form.getRawValue())
      .subscribe(project => this.project = project)
  }

  next(): void {
    if (!this.project) {
      this.planProject()
    } else {
      // Navegar a ProjectManagement
    }
  }
}
