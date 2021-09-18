import { Component, Inject, OnInit } from '@angular/core';
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
  ) {
    this.project$ = this.projectService.getViewModel().getStateValue();
  }

  ngOnInit(): void {
    this.projectService.startSystem();
  }

  async planProject(): Promise<void> {
    if (this.project$ !== null) {
      await this.projectService.deleteProject();
      await this.router.navigateByUrl('init-project/new');
    } else {
      this.router.navigateByUrl('init-project/new').then();
    }
  }

  openProject(): void {
    this.router.navigateByUrl('/project-management').then();
  }

}
