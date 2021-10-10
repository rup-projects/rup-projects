import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProjectManagementComponent} from './project-management.component';
import {PhaseManagementComponent} from './phase-management/phase-management.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'phases'},
  {path: 'phases', component: ProjectManagementComponent},
  {path: 'phases/:id/', pathMatch: 'full', redirectTo: 'phases/:id/iterations' },
  {path: 'phases/:id/iterations', component: PhaseManagementComponent },
  { path: 'phases/:id/iterations/:id', loadChildren: () =>
      import('../iteration-management/iteration-management.module').then(m => m.IterationManagementModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManagementRoutingModule {
}
