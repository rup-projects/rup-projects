import {Injectable} from '@angular/core';
import {UseCase} from '../../logic/models/use-case';
import {UseCaseRestRepository} from '../infrastructure/use-case-rest-repository';
import {OpenUseCasesController} from '../../logic/controllers/open-use-cases.controller';
import {OpenUseCaseController} from '../../logic/controllers/open-use-case.controller';
import {CreateUseCaseController} from '../../logic/controllers/create-use-case.controller';
import {UpdateUseCaseController} from '../../logic/controllers/update-use-case.controller';
import {DeleteUseCaseController} from '../../logic/controllers/delete-use-case.controller';
import {UseCasesManagementViewModel} from './view-models/use-cases-management-view-model.service';
import {Id} from '../../commons/model/id';
import {ErrorViewModel} from '../../commons/services/view-models/error.view-model';
import {Observable} from 'rxjs';

@Injectable()
export class UseCaseService {

  constructor(private useCaseRepository: UseCaseRestRepository,
              private errorViewModel: ErrorViewModel,
              private useCasesManagementViewModel: UseCasesManagementViewModel) {
  }

  public getSelectedUseCase$(): Observable<UseCase> {
    return this.useCasesManagementViewModel.selectedUseCase$;
  }

  public getUseCases$(): Observable<UseCase[]> {
    return this.useCasesManagementViewModel.useCases$;
  }

  async openUseCases(): Promise<void> {
    const result = await new OpenUseCasesController(this.useCaseRepository).execute();
    if (result.isSuccess()) {
      await this.useCasesManagementViewModel.dispatchUseCases(result.data);
    } else {
      await this.errorViewModel.dispatchAppError(result.error);
    }
  }

  async openUseCase(id: Id): Promise<void> {
    const result = await new OpenUseCaseController(this.useCaseRepository).execute(id);
    if (result.isSuccess()) {
      await this.useCasesManagementViewModel.dispatchSelectedUseCase(result.data);
    } else {
      await this.errorViewModel.dispatchAppError(result.error);
    }
  }

  async createUseCase(useCase: UseCase): Promise<void> {
    const result = await new CreateUseCaseController(this.useCaseRepository).execute(useCase);
    if (!result.isSuccess()) {
      await this.errorViewModel.dispatchAppError(result.error);
    }
  }

  async updateUseCase(useCase: UseCase): Promise<void> {
    const result = await new UpdateUseCaseController(this.useCaseRepository).execute(useCase);
    if (result.isSuccess()) {
      await this.useCasesManagementViewModel.dispatchSelectedUseCase(result.data);
      await this.openUseCases();
    } else {
      await this.errorViewModel.dispatchAppError(result.error);
    }
  }

  async deleteUseCase(id: Id): Promise<void> {
    const result = await new DeleteUseCaseController(this.useCaseRepository).execute(id);
    if (result.isSuccess()) {
      await this.openUseCases();
    } else {
      await this.errorViewModel.dispatchAppError(result.error);
    }
  }

}
