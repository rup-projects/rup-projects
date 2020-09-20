import { MatDialogRef } from '@angular/material/dialog';
import { MemberDialogComponent } from './member-dialog.component';

export class Dialog {
  constructor(public dialogRef: MatDialogRef<MemberDialogComponent>) {
  }
}
