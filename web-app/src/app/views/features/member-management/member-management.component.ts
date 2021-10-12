import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {ReadDetailDialogComponent} from '../../../../commons/components/dialogs/read-detail.dialog.component';
import {Member} from '../../../../logic/models/member';
import {MemberService} from '../../../controllers/member.service';
import {MemberDialogComponent} from './member-dialog/member-dialog.component';

@Component({
  selector: 'app-member-management',
  templateUrl: './member-management.component.html',
  styleUrls: ['./member-management.component.scss']
})
export class MemberManagementComponent {

  private readonly selectedMember$: Observable<Member>;
  members$: Observable<Member[]>;
  title: 'Members';

  constructor(private memberService: MemberService,
              private matDialog: MatDialog) {
    this.members$ = this.memberService.getMembersViewModel().getStateValue();
    this.selectedMember$ = this.memberService.getMemberViewModel().getStateValue();
    this.memberService.openMembers().then();
  }

  createMember(): void {
    this.matDialog
      .open(MemberDialogComponent)
      .afterClosed()
      .subscribe(() => this.memberService.openMembers());
  }

  openMember(member: Member): void {
    this.memberService.openMember(member.id).then(
      () => this.openMemberDetailDialog()
    );
  }

  updateMember(member: Member): void {
    this.matDialog
      .open(MemberDialogComponent, {data: member})
      .afterClosed()
      .subscribe(() => this.memberService.openMembers());
  }

  deleteMember(member: Member): void {
    // TODO Create confirmation dialog
    this.memberService
      .deleteMember(member.id)
      .then(() => this.memberService.openMembers());
  }

  private openMemberDetailDialog(): void {
    this.matDialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Member Details',
        object: this.selectedMember$
      }
    });
  }
}
