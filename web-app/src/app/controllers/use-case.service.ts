import {Injectable} from '@angular/core';
import {UseCase} from '../../logic/models/use-case';
import {UseCaseRepositoryImplService} from '../infrastructure/use-case-repository-impl.service';
import {OpenUseCasesController} from '../../logic/controllers/open-use-cases.controller';
import {OpenUseCaseController} from '../../logic/controllers/open-use-case.controller';
import {CreateUseCaseController} from '../../logic/controllers/create-use-case.controller';
import {UpdateUseCaseController} from '../../logic/controllers/update-use-case.controller';
import {DeleteUseCaseController} from '../../logic/controllers/delete-use-case.controller';
import {UseCaseViewModel} from './view-models/use-case.view-model';
import {UseCasesViewModel} from './view-models/use-cases.view-model';

@Injectable()
export class UseCaseService {

  constructor(private useCaseRepository: UseCaseRepositoryImplService,
              private useCaseViewMode: UseCaseViewModel,
              private useCasesViewMode: UseCasesViewModel) {
  }

  async openUseCases(): Promise<void> {
    const result = await new OpenUseCasesController(this.useCaseRepository).execute();
    this.useCasesViewMode.setValue(result);
  }

  async openUseCase(id: number): Promise<void> {
    const result = await new OpenUseCaseController(this.useCaseRepository).execute(id);
    this.useCaseViewMode.setValue(result);
  }

  async createUseCase(useCase: UseCase): Promise<void> {
    await new CreateUseCaseController(this.useCaseRepository).execute(useCase);
    await this.openUseCases();
  }

  async updateUseCase(useCase: UseCase): Promise<void> {
    await new UpdateUseCaseController(this.useCaseRepository).execute(useCase);
    await this.openUseCases();
  }

  async deleteUseCase(id: number): Promise<void> {
    await new DeleteUseCaseController(this.useCaseRepository).execute(id);
    await this.openUseCases();
  }
}
