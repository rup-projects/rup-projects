import { Component, OnInit } from '@angular/core';
import {Phase} from '../shared/models/phase';
import {PhaseProxyService} from '../shared/services/phase-proxy.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {

  phases: Phase[];
  displayedColumns: string[] = ['type', 'startDate', 'endDate', 'duration'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(private phaseService: PhaseProxyService, private router: Router) {
  }

  ngOnInit(): void {
    this.phaseService.openPhases().subscribe(phases => this.phases = phases);
  }

  openIterations(phase: Phase): void {
    this.router.navigate(['project-management/phase', phase.id]).then();
  }

  closeProject(): void {
    this.router.navigateByUrl(`/`).then();
  }

}
