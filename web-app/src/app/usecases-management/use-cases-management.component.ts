import {Component, OnInit} from '@angular/core';
import {UseCase} from '../../logic/models/use-case';
import {UseCaseProxyService} from '../core/services/use-case-proxy.service';
import {MatDialog} from '@angular/material/dialog';
import {UseCaseDialogComponent} from './use-case-dialog/use-case-dialog.component';
import {ReadDetailDialogComponent} from '../core/dialogs/read-detail.dialog.component';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-use-cases-management',
  templateUrl: './use-cases-management.component.html',
  styleUrls: ['./use-cases-management.component.scss']
})
export class UseCasesManagementComponent implements OnInit{

  useCases: Observable<UseCase[]>;
  private selected: UseCase;
  displayedColumns: string[] = ['name', 'description', 'priority'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  title: 'usecases';

  constructor(private useCaseService: UseCaseProxyService, private matDialog: MatDialog) {
  }


  ngOnInit(): void {
    this.useCases = this.useCaseService.openUseCases();
  }

  private openUseCases(): void {
    this.useCases = this.useCaseService.openUseCases();
  }

  openUsecase(useCase: UseCase): void {
    this.matDialog.open(ReadDetailDialogComponent, {
      data: {
        title: 'Usecase Details',
        object: this.useCaseService.openUseCase(useCase.id)
      }
    });
  }

  createUseCase(): void {
    this.matDialog
      .open(UseCaseDialogComponent)
      .afterClosed()
      .subscribe(() => this.openUseCases());
  }

  updateUseCase(useCase?: UseCase): void {
    this.matDialog
      .open(UseCaseDialogComponent, {data: useCase ? useCase : this.selected})
      .afterClosed()
      .subscribe(() => this.openUseCases());
  }

  deleteUseCase(useCase: UseCase): void {
    this.useCaseService
      .deleteMember(useCase.id)
      .subscribe(() => this.openUseCases());
  }
}
