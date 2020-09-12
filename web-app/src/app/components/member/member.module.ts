import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersManagementComponent } from './members-management/members-management.component';
import { MemberDialogComponent } from './member-dialog/member-dialog.component';
import { MemberRoutingModule } from './member-routing.module';



@NgModule({
  declarations: [MembersManagementComponent, MemberDialogComponent],
  imports: [
    CommonModule,
    MemberRoutingModule
  ]
})
export class MemberModule { }
