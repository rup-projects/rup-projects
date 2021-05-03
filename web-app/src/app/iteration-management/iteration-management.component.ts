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
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';


@Component({
  selector: 'app-iteration-management',
  templateUrl: './iteration-management.component.html',
  styleUrls: ['./iteration-management.component.scss']
})
export class IterationManagementComponent implements OnInit {

  calendarOptions;


  iteration: Iteration;

  constructor(private iterationService: IterationProxyService, private membersService: MemberProxyService, private activityService: ActivityProxyService,
              private router: Router, private activatedRoute: ActivatedRoute, private matDialog: MatDialog
  ) {
  }


  ngOnInit(): void {
    this.calendarOptions = {
      plugins: [resourceTimeGridPlugin],
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      timeZone: 'UTC',
      initialView: 'resourceTimeGridDay'
    };
    this.openIteration();
  }

  openIteration(): void {
    this.iterationService.openIteration(this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(iteration => {
        this.iteration = iteration;
        this.initCalendar(iteration);
      });
  }

  private initCalendar(i: Iteration): void {
    let members = [];
    let events = [];

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
  }

  openActivityDetails(id: string): void {
    //todo open mat dialog with data
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
    this.activityService.assignActivity(activity, {realizationId: null, datetime: null})
      .subscribe(() => this.openIteration());
  }


  closeActivity(activity: Activity): void {

  }

  getNotAssignedActivities(activities: Activity[]): Activity[] {
    return activities.filter(activity => activity.startDateTime === null);
  }

}
