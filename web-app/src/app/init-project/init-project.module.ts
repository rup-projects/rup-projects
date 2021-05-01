import {CommonModule} from '@angular/common';
import { NgModule} from '@angular/core';
import {InitProjectRoutingModule} from './init-project-routing.module';
import {InitProjectComponent} from './init-project.component';
import {SharedModule} from '../shared/shared.module';
import {PlanProjectComponent} from './plan-project/plan-project.component';
import {ProjectProxyService} from '../shared/services/project-proxy.service';
import {ProjectDaoImpl} from '../infrastructure/project-dao-impl';
import {ProjectFacadeController} from '../../logic/';

@NgModule({
  declarations: [InitProjectComponent, PlanProjectComponent],
  imports: [
    CommonModule,
    InitProjectRoutingModule,
    SharedModule,
  ],
  providers: [
    {
      provide: 'ProjectFacadeController',
      useClass: ProjectProxyService,
      deps: [ProjectDaoImpl]
    }
  ]
})
export class InitProjectModule {
}
