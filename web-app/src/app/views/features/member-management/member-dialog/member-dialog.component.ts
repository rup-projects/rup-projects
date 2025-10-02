import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Member } from '../../../../../logic/models/member';
import { MemberRole } from '../../../../../logic/models/member-role.enum';
import { MemberService } from '../../../../controllers/member.service';
import { MemberFormGroup } from './member-form-group';

@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.scss']
})
export class MemberDialogComponent {
  form: MemberFormGroup = new MemberFormGroup();
  eMemberRole = MemberRole;

  constructor(private memberService: MemberService, private marDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: Member) {
    if (data) {
      this.form.patchValue(data);
    }
  }

  create(): void {
    this.memberService
      .createMember(this.form.getRawValue())
      .then(() => this.marDialog.closeAll());
  }

  update(): void {
    this.memberService
      .updateMember(this.form.getRawValue())
      .then(() => this.marDialog.closeAll());
  }

  getMemberRoles(): MemberRole[] {
    return Object.values(MemberRole);
  }

  isCreate(): boolean {
    return this.form.id.value === null;
  }

}
