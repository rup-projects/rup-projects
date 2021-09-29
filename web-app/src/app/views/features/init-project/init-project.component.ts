import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, of, Subscription} from 'rxjs';
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

  private vmSubscription: Subscription;

  constructor(
    private projectService: ProjectService,
    private router: Router,
  ) {
    this.projectService.getViewModel().getStateValue().subscribe(
      val => {
        this.project$ = of(val.data);
      }
    )
  }

  async ngOnInit(): Promise<void> {
    await this.projectService.startSystem();
  }

  async toPlanProjectRoute(): Promise<void> {
    await this.router.navigateByUrl('init-project/new');
  }

  toProjectManagementRoute(): void {
    this.router.navigateByUrl('/project-management').then();
  }

}
