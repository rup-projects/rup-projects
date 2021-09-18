import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {UseCase} from '../../logic/models/use-case';
import {UseCaseRepositoryImplService} from '../infrastructure/use-case-repository-impl.service';
import {OpenUseCasesController} from '../../logic/controllers/open-use-cases.controller';
import {OpenUseCaseController} from '../../logic/controllers/open-use-case.controller';
import {CreateUseCaseController} from '../../logic/controllers/create-use-case.controller';
import {UpdateUseCaseController} from '../../logic/controllers/update-use-case.controller';
import {DeleteUseCaseController} from '../../logic/controllers/delete-use-case.controller';

@Injectable()
export class UseCaseService {

  constructor(private useCaseRepository: UseCaseRepositoryImplService) {
  }

  openUseCases(): Observable<UseCase[]> {
    const command = new OpenUseCasesController(this.useCaseRepository);
    return from(command.execute());
  }

  openUseCase(id: number): Observable<UseCase> {
    const command = new OpenUseCaseController(this.useCaseRepository);
    return from(command.execute(id));
  }

  createUseCase(useCase: UseCase): Observable<void> {
    const command = new CreateUseCaseController(this.useCaseRepository);
    return from(command.execute(useCase));
  }

  updateUseCase(useCase: UseCase): Observable<void> {
    const command = new UpdateUseCaseController(this.useCaseRepository);
    return from(command.execute(useCase));
  }

  deleteUseCase(id: number): Observable<void> {
    const command = new DeleteUseCaseController(this.useCaseRepository);
    return from(command.execute(id));
  }
}
