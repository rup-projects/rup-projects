import {Component, OnInit} from '@angular/core';
import {Iteration} from '../../shared/models/iteration';
import {ActivatedRoute, Router} from '@angular/router';
import {PhaseService} from '../../shared/services/phase.service';

@Component({
  selector: 'app-phase-management',
  templateUrl: './phase-management.component.html',
  styleUrls: ['./phase-management.component.scss']
})
export class PhaseManagementComponent implements OnInit {

  iterations: Iteration[];
  private selectedPhaseId: string;
  displayedColumns: string[] = ['id', 'number', 'startDate', 'endDate'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(private phaseService: PhaseService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.selectedPhaseId = this.activatedRoute.snapshot.paramMap.get('id');
    this.phaseService.openIterations(this.selectedPhaseId).subscribe(iterations => this.iterations = iterations);
  }

  openIteration(iteration: Iteration): void {
    this.router.navigateByUrl(`/iteration-management/${iteration.id}`).then();
  }

  openPhases(): void {
    this.router.navigateByUrl('project-management');
  }
}
