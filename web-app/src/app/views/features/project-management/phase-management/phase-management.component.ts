import {Component, OnInit} from '@angular/core';
import {Iteration} from '../../../../../logic/models/iteration';
import {ActivatedRoute, Router} from '@angular/router';
import {PhaseService} from '../../../../controllers/phase.service';
import {IterationService} from '../../../../controllers/iteration.service';
import {MemberService} from '../../../../controllers/member.service';
import {Observable} from 'rxjs';
import { Id } from '../../../../../commons/model/id';

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
  private phaseId: Id;

  constructor(private phaseService: PhaseService, private iterationService: IterationService, private membersService: MemberService,
              private router: Router, private activatedRoute: ActivatedRoute
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.iterations$ = this.phaseService.getIterations$();
    this.phaseId = this.getPhaseIdFromURI();
    await this.phaseService.openIterations(this.phaseId);
  }

  async openIteration(iteration: Iteration): Promise<void> {
    await this.router.navigateByUrl(`project-management/phases/${this.phaseId}/iterations/${iteration.id}`);
  }

  async openPhases(): Promise<void> {
    await this.router.navigateByUrl('project-management');
  }

  private getPhaseIdFromURI(): Id {
    return Number(this.activatedRoute.snapshot.paramMap.get(this.PHASE_ID_PARAM));
  }
}
