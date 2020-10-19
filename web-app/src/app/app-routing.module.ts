import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersManagementComponent } from './components/members-management/members-management.component';
import { UseCasesManagementComponent } from './components/use-cases-management/use-cases-management.component';

const routes: Routes = [
  {path: 'use-cases-management', component: UseCasesManagementComponent},
  {path: 'members-management', component: MembersManagementComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
