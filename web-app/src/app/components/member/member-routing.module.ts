import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersManagementComponent } from './members-management/members-management.component';

const routes: Routes = [
  {path: '', component: MembersManagementComponent}
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],

})
export class MemberRoutingModule {
}
