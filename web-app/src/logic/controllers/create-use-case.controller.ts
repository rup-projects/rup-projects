import {UseCaseRepository} from '../repositories/use-case.repository';
import {UseCase} from '../models/use-case';

export class CreateUseCaseController {
    constructor(private repository: UseCaseRepository) {

    }

  async execute(useCase: UseCase): Promise<void> {
    return await this.repository.create(useCase);
  }


}
