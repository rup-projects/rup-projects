import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { ProjectController } from '../../../../logic';
import { Project } from '../../../../logic/models/project';

@Component({
  selector: 'app-init-project',
  templateUrl: './init-project.component.html',
  styleUrls: ['./init-project.component.scss']
})
export class InitProjectComponent implements OnInit {

  project$: Observable<Project>;
  panelOpenState = false;

  constructor(@Inject('ProjectController') private projectController: ProjectController, private router: Router) {
  }

  ngOnInit(): void {
    this.project$ = from(this.projectController.startSystem());
  }

  async planProject(): Promise<void> {
    if (this.project$ != null) {
      await this.projectController.deleteProject();
      this.router.navigateByUrl('init-project/new');
    } else {
      this.router.navigateByUrl('init-project/new').then();
    }
  }

  openProject(): void {
    this.router.navigateByUrl('/project-management').then();
  }

}
