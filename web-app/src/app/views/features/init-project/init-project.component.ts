import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '../../../../logic/models/project';
import { ProjectService } from '../../../controllers/project.service';
import {Id} from '../../../../commons/model/id';

@Component({
  selector: 'app-init-project',
  templateUrl: './init-project.component.html',
  styleUrls: ['./init-project.component.scss'],
})
export class InitProjectComponent implements OnInit {

  project$: Observable<Project>;
  panelOpenState = false;

  constructor(
    private projectService: ProjectService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.projectService.startSystem().then(
      () => this.project$ = this.projectService.getViewModel().getStateValue()
    );
  }

  async deleteProject(id: Id): Promise<void>{
    await this.projectService.deleteProject(id).then(() => this.projectService.startSystem());
  }

  async toPlanProjectRoute(): Promise<void> {
    await this.router.navigateByUrl('init-project/new');
  }

  async toProjectManagementRoute(): Promise<void> {
    await this.router.navigateByUrl('/project-management');
  }

}
