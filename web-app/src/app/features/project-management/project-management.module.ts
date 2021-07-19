import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectManagementRoutingModule} from './project-management-routing.module';
import {ProjectManagementComponent} from './project-management.component';
import {PhaseManagementComponent} from './phase-management/phase-management.component';
import {SharedModule} from '../../core/shared.module';


@NgModule({
  declarations: [ProjectManagementComponent, PhaseManagementComponent],
  imports: [
    CommonModule,
    ProjectManagementRoutingModule,
    SharedModule
  ]
})
export class ProjectManagementModule {
}
