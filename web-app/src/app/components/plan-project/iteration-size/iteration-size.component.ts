import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../models/project';
import {ProjectService} from '../../../services/project.service';

@Component({
  selector: 'app-iteration-size',
  templateUrl: './iteration-size.component.html'
})
export class IterationSizeComponent implements OnInit {

  @Input() project: Project;
  numberOfIterations: number;

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
  }


  refreshProject(): void {
    this.projectService.refreshProject(this.project)
      .subscribe(project => this.project = project, error => this.projectService.getOpenedProject()
        .subscribe(project => this.project = project));
  }
}
