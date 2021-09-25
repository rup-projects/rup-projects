import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MemberService } from 'src/app/controllers/member.service';
import { MembersViewModel } from 'src/app/controllers/view-models/members.view-model';
import { MemberRestRepository } from '../../../infrastructure/member-rest-repository.service';
import { SharedModule } from '../../shared.module';
import { MemberDialogComponent } from './member-dialog/member-dialog.component';

import { MemberManagementRoutingModule } from './member-management-routing.module';
import { MemberManagementComponent } from './member-management.component';
import {MemberViewModel} from '../../../controllers/view-models/member.view-model';

@NgModule({
  declarations: [MemberManagementComponent, MemberDialogComponent],
  imports: [
    CommonModule,
    MemberManagementRoutingModule,
    SharedModule
  ],
  providers: [MemberService, MemberRestRepository, MembersViewModel, MemberViewModel]
})
export class MemberManagementModule {
}
