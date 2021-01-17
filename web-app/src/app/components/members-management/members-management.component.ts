import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Member } from '../../models/member';
import { MemberService } from '../../services/member.service';
import { MemberDialogComponent } from '../member-dialog/member-dialog.component';

@Component({
  selector: 'app-members-management',
  templateUrl: './members-management.component.html',
  styleUrls: ['./members-management.component.scss']
})
export class MembersManagementComponent {

  members: Member[];
  private selected: Member;

  constructor(private memberService: MemberService,
              private matDialog: MatDialog) {
    this.openMembers();
  }

  createMember(): void {
    this.matDialog
      .open(MemberDialogComponent)
      .afterClosed().subscribe(() => this.openMembers());
  }

  updateMember(member?: Member): void {
    this.matDialog
      .open(MemberDialogComponent, {data: member ? member : this.selected})
      .afterClosed().subscribe(() => this.openMembers());
  }

  deleteMember(): void {
    // TODO Create confirmation dialog
    this.memberService.delete(this.selected.id)
      .then(() => this.openMembers());
  }

  select(member: Member): void {
    if (this.selected && this.selected.id === member.id) {
      this.selected = null;
    } else {
      this.selected = member;
    }
  }

  isSelected(id: number): boolean {
    if (this.selected) {
      return id === this.selected.id;
    }

    return false;
  }

  nonSelected(): boolean {
    return !this.selected;
  }

  private openMembers(): void {
    this.memberService.openMembers().subscribe(members => this.members = members);
  }
}
