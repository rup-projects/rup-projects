import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProjectService } from '../../../controllers/project.service';
import { ProjectRestRepository } from '../../../infrastructure/project-rest-repository';
import { SharedModule } from '../../shared.module';
import { InitProjectRoutingModule } from './init-project-routing.module';
import { InitProjectComponent } from './init-project.component';
import { PlanProjectComponent } from './plan-project/plan-project.component';
import { ProjectViewModel } from '../../../controllers/view-models/project.view-model';

@NgModule({
  declarations: [InitProjectComponent, PlanProjectComponent],
  imports: [
    CommonModule,
    InitProjectRoutingModule,
    SharedModule,
  ],
  providers: [
    ProjectRestRepository,
    ProjectViewModel,
    ProjectService,
  ]

})
export class InitProjectModule {
}
