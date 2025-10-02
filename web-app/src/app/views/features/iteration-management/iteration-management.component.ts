import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Iteration} from '../../../../logic/models/iteration';
import {ActivityService} from '../../../controllers/activity.service';
import {Activity} from '../../../../logic/models/activity';
import {NotAssignedCost} from '../../../../logic/models/not-assigned-cost';
import {IterationService} from '../../../controllers/iteration.service';
import {MemberService} from '../../../controllers/member.service';
import {MatDialog} from '@angular/material/dialog';
import {ReestimateHoursDialogComponent} from './reestimate-hours-dialog/reestimate-hours-dialog.component';
import {AssignMemberDialogComponent} from './assign-member-dialog/assign-member-dialog.component';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import {ActivityDetailsDialogComponent} from './activity-details-dialog/activity-details-dialog.component';
import {IterationViewModel} from '../../../controllers/view-models/iteration-view-model';


@Component({
  selector: 'app-iteration-management',
  templateUrl: './iteration-management.component.html',
  styleUrls: ['./iteration-management.component.scss']
})
export class IterationManagementComponent implements OnInit {

  calendarOptions;


  iteration: Iteration;

  constructor(private iterationService: IterationService, private membersService: MemberService,
              private activityService: ActivityService, private router: Router,
              private activatedRoute: ActivatedRoute, private matDialog: MatDialog,
              private iterationViewModel: IterationViewModel) {
  }


  ngOnInit(): void {
    this.calendarOptions = {
      plugins: [resourceTimeGridPlugin],
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      timeZone: 'UTC',
      initialView: 'resourceTimeGridDay',
    };
    this.openIteration();
  }

  openIteration(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.iterationService.openIteration(id)
      .then( () => this.iterationService.getIteration$()
        .subscribe(iteration => {
          this.iteration = iteration;
          this.initCalendar(iteration);
        }));
  }

  private initCalendar(i: Iteration): void {
    const members = [];
    const events = [];

    this.iteration.realizations.forEach(realization => members.push({id: realization.id, title: realization.member.name}));
    this.iteration.realizations.forEach(realization => realization.activities.forEach(activity => events.push({
      id: activity.id,
      resourceId: realization.id,
      start: activity.startDateTime,
      end: new Date(activity.startDateTime).setHours(new Date(activity.startDateTime).getHours() + activity.hours),
      title: activity.description
    })));
    this.calendarOptions.validRange = {start: this.iteration.startDate, end: this.iteration.endDate};
    this.calendarOptions.resources = members;
    this.calendarOptions.events = events;
    this.calendarOptions.eventClick = (info) => this.openActivityDetailsDialog(info);
  }

  openActivityDetailsDialog(info: any): void {
    const activityId = info.event.id;
    const iterationId = this.iteration.id;
    this.matDialog
      .open(ActivityDetailsDialogComponent, {
        data: {activityId, iterationId},
      })
      .afterClosed()
      .subscribe(() => this.openIteration());
  }

  splitActivity(notAssignedCost: NotAssignedCost): void {
    this.activityService.splitActivity(notAssignedCost).then(() => this.openIteration());
  }

  mergeActivity(notAssignedActivity: Activity): void {
    this.activityService.mergeActivity(notAssignedActivity).then(() => this.openIteration());
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
    this.activityService.assignActivity({activityId: activity.id, realizationId: null, datetime: null})
      .then(() => this.openIteration());
  }


  closeActivity(activity: Activity): void {

  }

  getNotAssignedActivities(activities: Activity[]): Activity[] {
    return activities.filter(activity => activity.startDateTime === null);
  }

}
