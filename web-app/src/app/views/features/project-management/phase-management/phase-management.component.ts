import {Component, OnInit} from '@angular/core';
import {Iteration} from '../../../../../logic/models/iteration';
import {ActivatedRoute, Router} from '@angular/router';
import {PhaseService} from '../../../../controllers/phase.service';
import {IterationService} from '../../../../controllers/iteration.service';
import {MemberService} from '../../../../controllers/member.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-phase-management',
  templateUrl: './phase-management.component.html',
  styleUrls: ['./phase-management.component.scss']
})
export class PhaseManagementComponent implements OnInit {

  private readonly PHASE_ID_PARAM = 'id';
  iterations$: Observable<Iteration[]>;
  displayedColumns: string[] = ['id', 'number', 'startDate', 'endDate'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(private phaseService: PhaseService, private iterationService: IterationService, private membersService: MemberService,
              private router: Router, private activatedRoute: ActivatedRoute
  ) {
  }

  async ngOnInit(): Promise<void> {
    const phaseId = this.getPhaseIdFromURI();
    this.iterations$ = this.phaseService.getIterations$();
    await this.phaseService.openIterations(phaseId);
  }

  async openIteration(iteration: Iteration): Promise<void> {
    await this.router.navigateByUrl(`/iteration-management/${iteration.id}`);
  }

  async openPhases(): Promise<void> {
    await this.router.navigateByUrl('project-management');
  }

  private getPhaseIdFromURI(): number {
    return Number(this.activatedRoute.snapshot.paramMap.get(this.PHASE_ID_PARAM));
  }
}
