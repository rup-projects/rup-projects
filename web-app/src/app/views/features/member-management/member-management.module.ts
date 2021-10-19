import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MemberService } from 'src/app/controllers/member.service';
import { MemberRestRepository } from '../../../infrastructure/member-rest-repository';
import { SharedModule } from '../../shared.module';
import { MemberDialogComponent } from './member-dialog/member-dialog.component';

import { MemberManagementRoutingModule } from './member-management-routing.module';
import { MemberManagementComponent } from './member-management.component';
import { MembersManagementViewModel } from '../../../controllers/view-models/members-management.view-model';

@NgModule({
  declarations: [MemberManagementComponent, MemberDialogComponent],
  imports: [
    CommonModule,
    MemberManagementRoutingModule,
    SharedModule
  ],
  providers: [MemberService, MemberRestRepository, MembersManagementViewModel]
})
export class MemberManagementModule {
}
