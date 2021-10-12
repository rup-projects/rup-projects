import {Injectable} from '@angular/core';
import {UseCase} from '../../logic/models/use-case';
import {UseCaseRestRepository} from '../infrastructure/use-case-rest-repository';
import {OpenUseCasesController} from '../../logic/controllers/open-use-cases.controller';
import {OpenUseCaseController} from '../../logic/controllers/open-use-case.controller';
import {CreateUseCaseController} from '../../logic/controllers/create-use-case.controller';
import {UpdateUseCaseController} from '../../logic/controllers/update-use-case.controller';
import {DeleteUseCaseController} from '../../logic/controllers/delete-use-case.controller';
import {UseCaseViewModel} from './view-models/use-case.view-model';
import {UseCasesViewModel} from './view-models/use-cases.view-model';
import {Id} from '../../commons/model/id';
import {ErrorViewModel} from '../../commons/services/view-models/error.view-model';
import {ReadableViewModel} from '../../commons/services/types/readable-view-model';

@Injectable()
export class UseCaseService {

  constructor(private useCaseRepository: UseCaseRestRepository,
              private useCaseViewModel: UseCaseViewModel,
              private errorViewModel: ErrorViewModel,
              private useCasesViewModel: UseCasesViewModel) {
  }

  public getUseCaseViewModel(): ReadableViewModel<UseCase> {
    return this.useCaseViewModel;
  }

  public getUseCasesViewModel(): ReadableViewModel<UseCase[]> {
    return this.useCasesViewModel;
  }

  async openUseCases(): Promise<void> {
    const result = await new OpenUseCasesController(this.useCaseRepository).execute();
    if (result.isSuccess()) {
      this.useCasesViewModel.setValue(result.data);
    } else {
      await this.errorViewModel.dispatchAppError(result.error);
    }
  }

  async openUseCase(id: Id): Promise<void> {
    const result = await new OpenUseCaseController(this.useCaseRepository).execute(id);
    if (result.isSuccess()) {
      this.useCaseViewModel.setValue(result.data);
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
      this.useCasesViewModel.setValue(result.data);
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
