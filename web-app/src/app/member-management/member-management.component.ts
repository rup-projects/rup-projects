import {Component} from '@angular/core';
import {Member} from '../shared/models/member';
import {MemberService} from '../shared/services/member.service';
import {MatDialog} from '@angular/material/dialog';
import {MemberDialogComponent} from './member-dialog/member-dialog.component';
import {Observable} from 'rxjs';
import {ReadDetailDialogComponent} from '../shared/dialogs/read-detail.dialog.component';

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
    this.openMembers();
  }

  createMember(): void {
    this.matDialog
      .open(MemberDialogComponent)
      .afterClosed()
      .subscribe(() => this.openMembers());
  }

  private openMembers(): void {
    this.members = this.memberService.openMembers();
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
      .delete(member.id)
      .subscribe(() => this.openMembers());
  }
}
