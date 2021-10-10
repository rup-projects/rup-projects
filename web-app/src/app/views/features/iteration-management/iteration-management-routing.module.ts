import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IterationManagementComponent } from './iteration-management.component';

const routes: Routes = [
  { path: '', component: IterationManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IterationManagementRoutingModule { }
