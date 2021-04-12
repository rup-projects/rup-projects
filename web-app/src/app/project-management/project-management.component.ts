import { Component, OnInit } from '@angular/core';
import {Phase} from '../shared/models/phase';
import {PhaseProxyService} from '../shared/services/phase-proxy.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {

  phases$: Observable<Phase[]>;
  displayedColumns: string[] = ['type', 'startDate', 'endDate', 'duration'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(private phaseService: PhaseProxyService, private router: Router) {
  }

  ngOnInit(): void {
    this.phases$ = this.phaseService.openPhases();
  }

  openIterations(phase: Phase): void {
    this.router.navigate(['project-management/phase', phase.id]).then();
  }

  closeProject(): void {
    this.router.navigateByUrl(`/`).then();
  }

}
