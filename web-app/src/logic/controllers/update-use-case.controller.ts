import {UseCaseRepository} from '../repositories/use-case.repository';
import {UseCase} from '../models/use-case';
import {Controller} from '../../commons/services/types/controller';

export class UpdateUseCaseController implements Controller<UseCase, void>{
  constructor(private repository: UseCaseRepository)  {
  }

  async execute(useCase: UseCase): Promise<void> {
    const result = await this.repository.update(useCase.id, useCase);
    return result;
  }
}
