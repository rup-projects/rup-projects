import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../models/project';
import {ProjectService} from '../../../services/project.service';
import {Phase} from "../../../models/phase";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-iteration-size',
  templateUrl: './iteration-size.component.html'
})
export class IterationSizeComponent implements OnInit {

  @Input() project: Project;
  numberOfIterations: number;
  phases: Observable<Phase[]>;
  displayedColumns: string[] = ['type', 'startDate', 'endDate'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.phases = this.projectService.refreshProject(this.project).pipe( map(response => response.phases));
  }


  refreshProject(): void {
    this.projectService.refreshProject(this.project)
      .subscribe(project => this.project = project, error => this.projectService.getOpenedProject()
        .subscribe(project => this.project = project));
  }
}
