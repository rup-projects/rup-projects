import {NgModule} from '@angular/core';

import {IterationManagementRoutingModule} from './iteration-management-routing.module';
import {IterationManagementComponent} from './iteration-management.component';
import {SharedModule} from '../../shared.module';
import {ReestimateHoursDialogComponent} from './reestimate-hours-dialog/reestimate-hours-dialog.component';
import { AssignMemberDialogComponent } from './assign-member-dialog/assign-member-dialog.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import { ActivityDetailsDialogComponent } from './activity-details-dialog/activity-details-dialog.component';




@NgModule({
    declarations: [IterationManagementComponent, ReestimateHoursDialogComponent, AssignMemberDialogComponent, ActivityDetailsDialogComponent],
  imports: [
    SharedModule,
    IterationManagementRoutingModule,
    FullCalendarModule
  ]
})
export class IterationManagementModule {
}
