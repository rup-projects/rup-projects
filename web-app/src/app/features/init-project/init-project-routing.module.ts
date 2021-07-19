import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InitProjectComponent } from './init-project.component';
import {PlanProjectComponent} from './plan-project/plan-project.component';

const routes: Routes = [
  { path: '', component: InitProjectComponent },
  { path: 'new', component: PlanProjectComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InitProjectRoutingModule { }
