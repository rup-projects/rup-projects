import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectManagementRoutingModule} from './project-management-routing.module';
import {ProjectManagementComponent} from './project-management.component';
import {PhaseManagementComponent} from './phase-management/phase-management.component';
import {SharedModule} from '../../shared.module';
import {PhasesViewModel} from '../../../controllers/view-models/phases-view-model';
import {IterationsViewModel} from '../../../controllers/view-models/iterations-view-model';
import {MembersManagementViewModel} from '../../../controllers/view-models/members-management.view-model';



@NgModule({
  declarations: [ProjectManagementComponent, PhaseManagementComponent],
  imports: [
    CommonModule,
    ProjectManagementRoutingModule,
    SharedModule
  ],
  providers: [PhasesViewModel, IterationsViewModel, MembersManagementViewModel]
})
export class ProjectManagementModule {
}
