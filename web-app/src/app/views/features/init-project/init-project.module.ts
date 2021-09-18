import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProjectService } from '../../../controllers/project.service';
import { ProjectRepositoryImpl } from '../../../infrastructure/project-repository-impl.service';
import { SharedModule } from '../../shared.module';
import { InitProjectRoutingModule } from './init-project-routing.module';
import { InitProjectComponent } from './init-project.component';
import { PlanProjectComponent } from './plan-project/plan-project.component';
import { ProjectViewModel } from '../../../controllers/view-models/project-view-model';

// const projectViewModelFactory = new ProjectViewModel();

/*const projectMainControllerFactory = (repository: ProjectRepositoryImpl, vm: ProjectViewModel): ProjectControllerFacade => {
  return new ProjectService(repository, vm);
};*/

@NgModule({
  declarations: [InitProjectComponent, PlanProjectComponent],
  imports: [
    CommonModule,
    InitProjectRoutingModule,
    SharedModule
  ],
  providers: [
    ProjectRepositoryImpl,
    ProjectViewModel,
    ProjectService,
  ]

})
export class InitProjectModule {
}
