import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Project } from '../../../../logic/models/project';
import { ProjectService } from '../../../controllers/project.service';

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

  async toPlanProjectRoute(): Promise<void> {
    await this.router.navigateByUrl('init-project/new');
  }

  toProjectManagementRoute(): void {
    this.router.navigateByUrl('/project-management').then();
  }

}
