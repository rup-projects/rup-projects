import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Member } from '../../models/member';
import { MemberRole } from '../../models/member-role.enum';
import { MemberService } from '../../services/member.service';
import { MemberFormGroup } from './member-form-group';

@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.scss']
})
export class MemberDialogComponent {
  form: MemberFormGroup = new MemberFormGroup();

  constructor(private memberService: MemberService,
              public dialogRef: MatDialogRef<MemberDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public selected: Member) {
    if (selected) {
      this.form.patchValue(selected);
    }
  }

  saveMember(): void {
    if (this.form.id.value) {
      this.memberService.updateMember(this.form.getRawValue()).then(() => console.log('ok'));
    } else {
      this.memberService.createMember(this.form.getRawValue()).then(() => console.log('ok'));
    }
  }

  getMemberRoles(): MemberRole[] {
    return [
      MemberRole.Developer, MemberRole.Architect
    ];
  }

}
