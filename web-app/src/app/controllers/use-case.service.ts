import {Injectable} from '@angular/core';
import {UseCase} from '../../logic/models/use-case';
import {UseCaseRestRepository} from '../infrastructure/use-case-rest-repository.service';
import {OpenUseCasesController} from '../../logic/controllers/open-use-cases.controller';
import {OpenUseCaseController} from '../../logic/controllers/open-use-case.controller';
import {CreateUseCaseController} from '../../logic/controllers/create-use-case.controller';
import {UpdateUseCaseController} from '../../logic/controllers/update-use-case.controller';
import {DeleteUseCaseController} from '../../logic/controllers/delete-use-case.controller';
import {UseCaseViewModel} from './view-models/use-case.view-model';
import {UseCasesViewModel} from './view-models/use-cases.view-model';
import {Id} from '../../commons/model/id';

@Injectable()
export class UseCaseService {

  constructor(private useCaseRepository: UseCaseRestRepository,
              private useCaseViewModel: UseCaseViewModel,
              private useCasesViewModel: UseCasesViewModel) {
  }

  async openUseCases(): Promise<void> {
    const result = await new OpenUseCasesController(this.useCaseRepository).execute();
    this.useCasesViewModel.setValue(result);
  }

  async openUseCase(id: Id): Promise<void> {
    const result = await new OpenUseCaseController(this.useCaseRepository).execute(id);
    this.useCaseViewModel.setValue(result);
  }

  async createUseCase(useCase: UseCase): Promise<void> {
    await new CreateUseCaseController(this.useCaseRepository).execute(useCase);
    await this.openUseCases();
  }

  async updateUseCase(useCase: UseCase): Promise<void> {
    await new UpdateUseCaseController(this.useCaseRepository).execute(useCase);
    await this.openUseCases();
  }

  async deleteUseCase(id: Id): Promise<void> {
    await new DeleteUseCaseController(this.useCaseRepository).execute(id);
    await this.openUseCases();
  }
}
