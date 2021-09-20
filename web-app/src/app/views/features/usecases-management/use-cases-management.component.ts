import {Component, OnInit} from '@angular/core';
import {UseCase} from '../../../../logic/models/use-case';
import {UseCaseService} from '../../../controllers/use-case.service';
import {MatDialog} from '@angular/material/dialog';
import {UseCaseDialogComponent} from './use-case-dialog/use-case-dialog.component';
import {ReadDetailDialogComponent} from '../../../../commons/components/dialogs/read-detail.dialog.component';
import {Observable} from 'rxjs';
import {UseCaseViewModel} from '../../../controllers/view-models/use-case.view-model';
import {UseCasesViewModel} from '../../../controllers/view-models/use-cases.view-model';

@Component({
  selector: 'app-use-cases-management',
  templateUrl: './use-cases-management.component.html',
  styleUrls: ['./use-cases-management.component.scss']
})
export class UseCasesManagementComponent implements OnInit {

  useCases: Observable<UseCase[]>;
  displayedColumns: string[] = ['name', 'description', 'priority'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  title: 'usecases';
  private selectedUseCase: Observable<UseCase>;
  private selected: UseCase;

  constructor(private useCaseService: UseCaseService,
              private useCaseViewModel: UseCaseViewModel,
              private useCasesViewModel: UseCasesViewModel,
              private matDialog: MatDialog) {
  }


  ngOnInit(): void {
    this.selectedUseCase = this.useCaseViewModel.getStateValue();
    this.useCases = this.useCasesViewModel.getStateValue();
    this.useCaseService.openUseCases();
  }

  openUsecase(useCase: UseCase): void {
    this.useCaseService.openUseCase(useCase.id);
    this.matDialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Usecase Details',
        object: this.selectedUseCase
      }
    });
  }

  createUseCase(): void {
    this.matDialog.open(UseCaseDialogComponent);
  }

  updateUseCase(useCase?: UseCase): void {
    this.matDialog.open(UseCaseDialogComponent, {data: useCase ? useCase : this.selected});
  }

  deleteUseCase(useCase: UseCase): void {
    this.useCaseService.deleteUseCase(useCase.id);
  }
}
