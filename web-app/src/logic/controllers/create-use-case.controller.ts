import {UseCaseRepository} from '../repositories/use-case.repository';
import {UseCase} from '../models/use-case';
import {Controller} from '../../commons/services/types/controller';

export class CreateUseCaseController implements Controller<UseCase, void>{
    constructor(private repository: UseCaseRepository) {

    }

  async execute(useCase: UseCase): Promise<void> {
    return await this.repository.create(useCase);
  }


}
