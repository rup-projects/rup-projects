import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberManagementComponent } from './member-management.component';

const routes: Routes = [{ path: '', component: MemberManagementComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberManagementRoutingModule { }
