import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {UseCaseProxyService} from '../../core/services/use-case-proxy.service';
import {UseCase} from '../../core/models/use-case';

@Component({
  selector: 'app-use-case-dialog',
  templateUrl: './use-case-dialog.component.html',
  styleUrls: ['./use-case-dialog.component.scss']
})
export class UseCaseDialogComponent {
  useCase: UseCase;


  constructor(private useCaseService: UseCaseProxyService, private marDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) data: UseCase) {
    if (data !== null) {
      this.useCase = {id: data.id, name: data.name, description: data.description, priority: data.priority};
    } else {
      this.useCase = {id: undefined, name: undefined, description: undefined, priority: undefined};
    }
  }

  create(): void {
    this.useCaseService
      .createUseCase(this.useCase)
      .subscribe(() => this.marDialog.closeAll());
  }

  update(): void {
    this.useCaseService
      .updateUseCase(this.useCase)
      .subscribe(() => this.marDialog.closeAll());
  }

  invalid(): boolean {
    return this.check(this.useCase.name) || this.check(this.useCase.description);
  }

  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }


}
