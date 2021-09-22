import { Component, OnInit } from '@angular/core';
import {Phase} from '../../../../logic/models/phase';
import {PhaseService} from '../../../controllers/phase.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {PhasesViewModel} from '../../../controllers/view-models/phases-view-model.service';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.scss']
})
export class ProjectManagementComponent implements OnInit {

  phases$: Observable<Phase[]>;
  displayedColumns: string[] = ['type', 'startDate', 'endDate', 'duration'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(private phaseService: PhaseService, private router: Router, private phasesViewModel: PhasesViewModel) {
  }
  ngOnInit(): void {
    this.phases$ = this.phasesViewModel.getStateValue();
    this.phaseService.openPhases();
  }

  openIterations(phase: Phase): void {
    this.router.navigate(['project-management/phase', phase.id]).then();
  }

  closeProject(): void {
    this.router.navigateByUrl(`/`).then();
  }

}
