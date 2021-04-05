import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {InitProjectRoutingModule} from './init-project-routing.module';
import {InitProjectComponent} from './init-project.component';
import {SharedModule} from '../shared/shared.module';
import {PlanProjectComponent} from './plan-project/plan-project.component';


@NgModule({
  declarations: [InitProjectComponent, PlanProjectComponent],
  imports: [
    CommonModule,
    InitProjectRoutingModule,
    SharedModule
  ]
})
export class InitProjectModule {
}
