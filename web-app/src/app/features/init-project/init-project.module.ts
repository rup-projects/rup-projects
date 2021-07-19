import {CommonModule} from '@angular/common';
import { NgModule} from '@angular/core';
import {InitProjectRoutingModule} from './init-project-routing.module';
import {InitProjectComponent} from './init-project.component';
import {SharedModule} from '../../core/shared.module';
import {PlanProjectComponent} from './plan-project/plan-project.component';
import {ProjectProxyService} from '../../core/services/project-proxy.service';
import {ProjectDaoImpl} from '../../infrastructure/project-dao-impl';
import {ProjectFacadeController} from '../../../logic';
import {Project} from '../../core/models/project';


const projectFacadeFactory = (dao: ProjectDaoImpl): ProjectFacadeController => {
  return new ProjectProxyService(dao);
};

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
      useFactory: projectFacadeFactory,
      deps: [ProjectDaoImpl]
    },
    {provide: 'ProjectDao', useClass: ProjectDaoImpl}
  ]
})
export class InitProjectModule {
}
