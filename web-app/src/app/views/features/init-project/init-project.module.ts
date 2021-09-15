import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProjectController } from '../../../../logic';
import { ProjectProxyService } from '../../../controllers/project-proxy.service';
import { ProjectRepositoryImpl } from '../../../infrastructure/project-repository-impl.service';
import { SharedModule } from '../../shared.module';
import { InitProjectRoutingModule } from './init-project-routing.module';
import { InitProjectComponent } from './init-project.component';
import { PlanProjectComponent } from './plan-project/plan-project.component';


const projectControllerFactory = (dao: ProjectRepositoryImpl): ProjectController => {
  return new ProjectProxyService(dao);
};

@NgModule({
  declarations: [InitProjectComponent, PlanProjectComponent],
  imports: [
    CommonModule,
    InitProjectRoutingModule,
    SharedModule
  ],
  providers: [
    {
      provide: ProjectController,
      useFactory: projectControllerFactory,
      deps: [ProjectRepositoryImpl]
    },
    {provide: 'ProjectDao', useClass: ProjectRepositoryImpl}
  ]
})
export class InitProjectModule {
}
