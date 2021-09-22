import {Component, OnInit} from '@angular/core';
import {Iteration} from '../../../../../logic/models/iteration';
import {ActivatedRoute, Router} from '@angular/router';
import {PhaseService} from '../../../../controllers/phase.service';
import {IterationService} from '../../../../controllers/iteration.service';
import {MemberService} from '../../../../controllers/member.service';
import {Observable} from 'rxjs';
import {IterationsViewModel} from '../../../../controllers/view-models/iterations-view-model.service';

@Component({
  selector: 'app-phase-management',
  templateUrl: './phase-management.component.html',
  styleUrls: ['./phase-management.component.scss']
})
export class PhaseManagementComponent implements OnInit {

  iterations$: Observable<Iteration[]>;
  displayedColumns: string[] = ['id', 'number', 'startDate', 'endDate'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(private phaseService: PhaseService, private iterationService: IterationService, private membersService: MemberService,
              private router: Router, private activatedRoute: ActivatedRoute, private iterationsViewModel: IterationsViewModel
  ) {
  }

  ngOnInit(): void {
    const phaseId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.phaseService.openIterations(phaseId);
    this.iterations$ = this.iterationsViewModel.getStateValue();
  }

  openIteration(iteration: Iteration): void {
    this.router.navigateByUrl(`/iteration-management/${iteration.id}`).then();
  }

  openPhases(): void {
    this.router.navigateByUrl('project-management');
  }
}
