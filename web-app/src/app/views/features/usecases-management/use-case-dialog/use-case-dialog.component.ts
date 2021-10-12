import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {UseCaseService} from '../../../../controllers/use-case.service';
import {UseCase} from '../../../../../logic/models/use-case';

@Component({
  selector: 'app-use-case-dialog',
  templateUrl: './use-case-dialog.component.html',
  styleUrls: ['./use-case-dialog.component.scss']
})
export class UseCaseDialogComponent {
  useCase: UseCase;


  constructor(private useCaseService: UseCaseService, private marDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) data: UseCase) {
    if (data !== null) {
      this.useCase = {id: data.id, name: data.name, description: data.description, priority: data.priority};
    } else {
      this.useCase = {id: undefined, name: undefined, description: undefined, priority: undefined};
    }
  }

  create(): void {
    this.useCaseService.createUseCase(this.useCase)
    .then(() => this.marDialog.closeAll())
      .then(() => this.useCaseService.openUseCases());
  }

  update(): void {
    this.useCaseService.updateUseCase(this.useCase)
    .then(() => this.marDialog.closeAll());
  }

  invalid(): boolean {
    return this.check(this.useCase.name) || this.check(this.useCase.description);
  }

  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }


}
