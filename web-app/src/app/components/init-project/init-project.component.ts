import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectService} from '../../services/project.service';
import {Project} from '../../models/project';

@Component({
  selector: 'app-init-project',
  templateUrl: './init-project.component.html',
  styleUrls: ['./init-project.component.scss']
})
export class InitProjectComponent implements OnInit {

  project: Project;

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.projectService.getOpenedProject().subscribe(project => this.project = project);
  }

  planProject(): void {
    if (this.project != null) {
      this.projectService.deleteProject().then(() => this.router.navigateByUrl(`/plan-project`).then());
    } else {
      this.router.navigateByUrl(`/plan-project`).then();
    }
  }

  openProject(): void {
    this.router.navigateByUrl('/project-management').then();
  }

  existsProject(): boolean {
    return this.project != null;
  }
}
