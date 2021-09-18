import {Component, OnInit} from '@angular/core';
import {Iteration} from '../../../../../logic/models/iteration';
import {ActivatedRoute, Router} from '@angular/router';
import {PhaseProxyService} from '../../../../controllers/phase-proxy.service';
import {IterationProxyService} from '../../../../controllers/iteration-proxy.service';
import {MemberService} from '../../../../controllers/member.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-phase-management',
  templateUrl: './phase-management.component.html',
  styleUrls: ['./phase-management.component.scss']
})
export class PhaseManagementComponent implements OnInit {

  iterations$: Observable<Iteration[]>;
  displayedColumns: string[] = ['id', 'number', 'startDate', 'endDate'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  constructor(private phaseService: PhaseProxyService, private iterationService: IterationProxyService, private membersService: MemberService,
              private router: Router, private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.iterations$ = this.phaseService.openIterations(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  openIteration(iteration: Iteration): void {
    this.router.navigateByUrl(`/iteration-management/${iteration.id}`).then();
  }

  openPhases(): void {
    this.router.navigateByUrl('project-management');
  }
}
