import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Iteration} from '../shared/models/iteration';
import {ActivityProxyService} from '../shared/services/activity-proxy.service';
import {Activity} from '../shared/models/activity';
import {NotAssignedCost} from '../shared/models/not-assigned-cost';
import {IterationProxyService} from '../shared/services/iteration-proxy.service';
import {MemberProxyService} from '../shared/services/member-proxy.service';
import {MatDialog} from '@angular/material/dialog';
import {ReestimateHoursDialogComponent} from './reestimate-hours-dialog/reestimate-hours-dialog.component';
import {AssignMemberDialogComponent} from './assign-member-dialog/assign-member-dialog.component';

@Component({
  selector: 'app-iteration-management',
  templateUrl: './iteration-management.component.html',
  styleUrls: ['./iteration-management.component.scss']
})
export class IterationManagementComponent implements OnInit {

  iteration: Iteration;

  constructor(private iterationService: IterationProxyService, private membersService: MemberProxyService, private activityService: ActivityProxyService,
              private router: Router, private activatedRoute: ActivatedRoute, private matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.openIteration();
  }

  openIteration(): void {
    this.iterationService.openIteration(this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(iteration => this.iteration = iteration);
  }

  splitActivity(notAssignedCost: NotAssignedCost): void {
    this.activityService.splitActivity(notAssignedCost).subscribe(() => this.openIteration());
  }

  mergeActivity(notAssignedActivity: Activity): void {
    this.activityService.mergeActivity(notAssignedActivity).subscribe(() => this.openIteration());
  }

  reestimateActivity(activity: Activity, notAssignedCost: NotAssignedCost): void {
    this.matDialog
      .open(ReestimateHoursDialogComponent, {
        data: {activity, notAssignedCost},
      })
      .afterClosed()
      .subscribe(() => this.openIteration());

  }

  assignActivity(activity: Activity, notAssignedCost: NotAssignedCost): void {
    this.matDialog
      .open(AssignMemberDialogComponent, {
        data: {activity, notAssignedCost, iteration: this.iteration},
      })
      .afterClosed()
      .subscribe(() => this.openIteration());
  }

  unAssignActivity(activity: Activity): void {
    this.activityService.assignActivity(activity, {realizationId: null, datetime:null})
      .subscribe(() => this.openIteration());
  }


  closeActivity(activity: Activity): void {

  }

  getNotAssignedActivities(activities: Activity[]): Activity[] {
    return activities.filter(activity => activity.startDateTime === null);
  }
}
