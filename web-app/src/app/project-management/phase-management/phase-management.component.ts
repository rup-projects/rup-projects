import {Component, OnInit} from '@angular/core';
import {Iteration} from '../../shared/models/iteration';
import {ActivatedRoute, Router} from '@angular/router';
import {PhaseProxyService} from '../../shared/services/phase-proxy.service';
import {Member} from '../../shared/models/member';
import {IterationProxyService} from '../../shared/services/iteration-proxy.service';
import {MemberProxyService} from '../../shared/services/member-proxy.service';
import {Activity} from '../../shared/models/activity';

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

    constructor(private phaseService: PhaseProxyService, private iterationService: IterationProxyService, private membersService: MemberProxyService,
                private router: Router, private activatedRoute: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.selectedPhaseId = this.activatedRoute.snapshot.paramMap.get('id');
        this.phaseService.openIterations(this.selectedPhaseId).subscribe(iterations => this.iterations = iterations);
    }

    openIteration(iteration: Iteration): void {
        if (iteration.realizations.length === 0) {
            this.iterationService.openIteration(iteration.id.toString())
                .subscribe(result => this.membersService.openMembers()
                    .subscribe(members => this.initRealizations(members, result)));
        }

        this.router.navigateByUrl(`/iteration-management/${iteration.id}`).then();
    }

    private initRealizations(members: Member[], iteration: Iteration): void {
        members.forEach(mem => iteration.realizations.push(
            {
                id: undefined,
                member: mem,
                activities: this.initActivities(iteration.dateTimes)
            }
        ));
        this.iterationService.updateIteration(iteration).subscribe(result => this.router.navigateByUrl(`/iteration-management/${iteration.id}`).then());
    }

    private initActivities(dateTimes: Date[]): Activity[] {
        const activities = [];
        dateTimes.forEach(dateTime => activities.push(
            {
                id: undefined,
                description: undefined,
                hours: 1,
                disciplineType: undefined,
                startDateTime: dateTime
            }
        ));
        return activities;
    }


    openPhases(): void {
        this.router.navigateByUrl('project-management');
    }
}
