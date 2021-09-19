import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ReadDetailDialogComponent } from '../../../../commons/components/dialogs/read-detail.dialog.component';
import { Member } from '../../../../logic/models/member';
import { MemberService } from '../../../controllers/member.service';
import { MemberDialogComponent } from './member-dialog/member-dialog.component';

@Component({
  selector: 'app-member-management',
  templateUrl: './member-management.component.html',
  styleUrls: ['./member-management.component.scss']
})
export class MemberManagementComponent {

  members: Observable<Member[]>;
  private selected: Member;
  title: 'Members';

  constructor(private memberService: MemberService,
              private matDialog: MatDialog) {
    this.members = this.memberService.getViewModel().getStateValue();
    this.openMembers();
  }

  createMember(): void {
    this.matDialog
      .open(MemberDialogComponent)
      .afterClosed()
      .subscribe(() => this.openMembers());
  }

  private openMembers(): void {
    this.memberService.openMembers();
  }

  openMember(member: Member): void {
    this.matDialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Member Details',
        object: this.memberService.openMember(member.id)
      }
    });
  }

  updateMember(member: Member): void {
    this.matDialog
      .open(MemberDialogComponent, {data: member ? member : this.selected})
      .afterClosed()
      .subscribe(() => this.openMembers());
  }

  deleteMember(member: Member): void {
    // TODO Create confirmation dialog
    this.memberService
      .deleteMember(member.id)
      .subscribe(() => this.openMembers());
  }
}
