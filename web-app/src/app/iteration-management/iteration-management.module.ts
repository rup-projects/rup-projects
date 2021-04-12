import {NgModule} from '@angular/core';

import {IterationManagementRoutingModule} from './iteration-management-routing.module';
import {IterationManagementComponent} from './iteration-management.component';
import {SharedModule} from '../shared/shared.module';
import {ReestimateHoursDialogComponent} from './reestimate-hours-dialog/reestimate-hours-dialog.component';
import { AssignMemberDialogComponent } from './assign-member-dialog/assign-member-dialog.component';


@NgModule({
    declarations: [IterationManagementComponent, ReestimateHoursDialogComponent, AssignMemberDialogComponent],
    imports: [
        SharedModule,
        IterationManagementRoutingModule
    ]
})
export class IterationManagementModule {
}
