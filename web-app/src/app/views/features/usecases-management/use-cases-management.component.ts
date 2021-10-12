import {Component, OnInit} from '@angular/core';
import {UseCase} from '../../../../logic/models/use-case';
import {UseCaseService} from '../../../controllers/use-case.service';
import {MatDialog} from '@angular/material/dialog';
import {UseCaseDialogComponent} from './use-case-dialog/use-case-dialog.component';
import {ReadDetailDialogComponent} from '../../../../commons/components/dialogs/read-detail.dialog.component';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-use-cases-management',
  templateUrl: './use-cases-management.component.html',
  styleUrls: ['./use-cases-management.component.scss']
})
export class UseCasesManagementComponent implements OnInit {

  useCases$: Observable<UseCase[]>;
  displayedColumns: string[] = ['name', 'description', 'priority'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  title: 'usecases';
  private selectedUseCase$: Observable<UseCase>;

  constructor(private useCaseService: UseCaseService,
              private matDialog: MatDialog) {
  }


  ngOnInit(): void {
    this.useCases$ = this.useCaseService.getUseCases$();
    this.selectedUseCase$ = this.useCaseService.getSelectedUseCase$();
    this.useCaseService.openUseCases().then();
  }

  openUsecase(useCase: UseCase): void {
    this.useCaseService.openUseCase(useCase.id).then(
      () => this.openUseCaseDetailDialog());
  }

  createUseCase(): void {
    this.matDialog.open(UseCaseDialogComponent);
  }

  updateUseCase(useCase: UseCase): void {
    this.matDialog.open(UseCaseDialogComponent, {data: useCase});
  }

  async deleteUseCase(useCase: UseCase): Promise<void> {
    await this.useCaseService.deleteUseCase(useCase.id);
  }

  private openUseCaseDetailDialog(): void {
    this.matDialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Usecase Details',
        object: this.selectedUseCase$
      }
    });
  }
}
