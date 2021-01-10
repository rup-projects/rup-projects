import { Component, OnInit } from '@angular/core';
import { Iteration } from '../../models/iteration';
import { IterationService } from '../../services/iteration.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-phase-management',
  templateUrl: './phase-management.component.html',
  styleUrls: ['./phase-management.component.scss']
})
export class PhaseManagementComponent implements OnInit {

  iterations: Iteration[];
  private selectedPhaseId: string;

  constructor(private iterationService: IterationService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          this.selectedPhaseId = params.phaseId;
        }
      );
    this.iterationService.openIterationsByPhase(this.selectedPhaseId).subscribe(iterations => this.iterations = iterations);
  }

  openIteration(iteration: Iteration): void {
    this.router.navigateByUrl(`/iteration-management/${iteration.id}`).then();
  }

}
