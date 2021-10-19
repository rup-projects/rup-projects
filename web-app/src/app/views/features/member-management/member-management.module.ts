import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MemberService } from 'src/app/controllers/member.service';
import { MemberRestRepository } from '../../../infrastructure/member-rest-repository';
import { SharedModule } from '../../shared.module';
import { MemberDialogComponent } from './member-dialog/member-dialog.component';

import { MemberManagementRoutingModule } from './member-management-routing.module';
import { MemberManagementComponent } from './member-management.component';

@NgModule({
  declarations: [MemberManagementComponent, MemberDialogComponent],
  imports: [
    CommonModule,
    MemberManagementRoutingModule,
    SharedModule
  ],
  providers: [MemberService, MemberRestRepository]
})
export class MemberManagementModule {
}
