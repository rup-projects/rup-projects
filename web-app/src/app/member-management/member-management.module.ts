  import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberManagementRoutingModule } from './member-management-routing.module';
import { MemberManagementComponent } from './member-management.component';
import {SharedModule} from '../shared/shared.module';
import {MemberDialogComponent} from './member-dialog/member-dialog.component';


@NgModule({
  declarations: [MemberManagementComponent, MemberDialogComponent],
  imports: [
    CommonModule,
    MemberManagementRoutingModule,
    SharedModule
  ]
})
export class MemberManagementModule { }
