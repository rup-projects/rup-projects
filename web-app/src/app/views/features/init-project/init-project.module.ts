import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProjectService } from '../../../controllers/project.service';
import { ProjectRestRepository } from '../../../infrastructure/project-rest-repository';
import { SharedModule } from '../../shared.module';
import { InitProjectRoutingModule } from './init-project-routing.module';
import { InitProjectComponent } from './init-project.component';
import { PlanProjectComponent } from './plan-project/plan-project.component';
import { InitProjectViewModel } from '../../../controllers/view-models/init-project.view-model';

@NgModule({
  declarations: [InitProjectComponent, PlanProjectComponent],
  imports: [
    CommonModule,
    InitProjectRoutingModule,
    SharedModule
  ],
  providers: [
    ProjectRestRepository,
    InitProjectViewModel,
    ProjectService
  ]

})
export class InitProjectModule {
}
