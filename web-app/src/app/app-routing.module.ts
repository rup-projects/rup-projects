import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersManagementComponent } from './components/members-management/members-management.component';
import { PlanProjectComponent } from './components/plan-project/plan-project.component';
import { ProjectManagementComponent } from './components/project-management/project-management.component';
import { UseCasesManagementComponent } from './components/use-cases-management/use-cases-management.component';
import {PhaseManagementComponent} from "./components/phase-management/phase-management.component";

const routes: Routes = [
  {path: '', component: PlanProjectComponent},
  {path: 'use-cases-management', component: UseCasesManagementComponent},
  {path: 'members-management', component: MembersManagementComponent},
  {path: 'project-management', component: ProjectManagementComponent},
  {path: 'phase-management', component: PhaseManagementComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
