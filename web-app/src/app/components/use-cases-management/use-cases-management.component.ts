import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UseCase } from '../../models/use-case';
import { UseCaseService } from '../../services/use-case.service';
import { UseCaseDialogComponent } from '../use-case-dialog/use-case-dialog.component';

@Component({
  selector: 'app-use-cases-management',
  templateUrl: './use-cases-management.component.html',
  styleUrls: ['./use-cases-management.component.scss']
})
export class UseCasesManagementComponent {

  useCases: UseCase[];
  private selected: UseCase;

  constructor(private useCaseService: UseCaseService,
              private matDialog: MatDialog) {
    this.openUseCases();
  }

  private openUseCases(): void {
    this.useCaseService.openUseCases()
      .subscribe(useCases => this.useCases = useCases);
  }

  createUseCase(): void {
    this.matDialog
      .open(UseCaseDialogComponent)
      .afterClosed().subscribe(() => this.openUseCases());
  }

  updateUseCase(useCase?: UseCase): void {
    this.matDialog
      .open(UseCaseDialogComponent, {data: useCase ? useCase : this.selected})
      .afterClosed().subscribe(() => this.openUseCases());
  }

  deleteUseCase(): void {
    // TODO Create confirmation dialog
    this.useCaseService.delete(this.selected.id)
      .then(() => this.openUseCases());
  }

  select(useCase: UseCase): void {
    if (this.selected?.id === useCase.id) {
      this.selected = null;
    } else {
      this.selected = useCase;
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

}
