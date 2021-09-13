import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProjectManagementComponent} from './project-management.component';
import {PhaseManagementComponent} from './phase-management/phase-management.component';

const routes: Routes = [
  {path: '', component: ProjectManagementComponent},
  {path: 'phase/:id', component: PhaseManagementComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManagementRoutingModule {
}
