import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UseCase } from '../../models/use-case';
import { UseCaseService } from '../../services/use-case.service';
import { UseCaseFormGroup } from './use-case-form-group';

@Component({
  selector: 'app-use-case-dialog',
  templateUrl: './use-case-dialog.component.html',
  styleUrls: ['./use-case-dialog.component.scss']
})
export class UseCaseDialogComponent {
  form: UseCaseFormGroup = new UseCaseFormGroup();

  constructor(private useCaseService: UseCaseService,
              public dialogRef: MatDialogRef<UseCaseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public selected: UseCase) {
    if (selected) {
      this.form.patchValue(selected);
    }
  }

  saveUseCase(): void {
    // if (this.form.id.value) {
    //   this.useCaseService.updateUseCase(this.form.getRawValue()).then(() => console.log('ok'));
    // } else {
    //   this.useCaseService.createUseCase(this.form.getRawValue()).then(() => console.log('ok'));
    // }
  }

}
