import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MemberService } from '../../services/member.service';
import { MemberDialogComponent } from './member-dialog/member-dialog.component';
import { MemberRoutingModule } from './member-routing.module';
import { MembersManagementComponent } from './members-management/members-management.component';


@NgModule({
  declarations: [MembersManagementComponent, MemberDialogComponent],
  imports: [
    CommonModule,
    MemberRoutingModule,
    MatTableModule,
    CdkTableModule
  ],
  providers: [MemberService]
})
export class MemberModule { }
