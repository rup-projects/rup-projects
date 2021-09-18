import {UseCaseRepository} from '../repositories/use-case.repository';
import {UseCase} from '../models/use-case';

export class UpdateUseCaseController {
  constructor(private repository: UseCaseRepository) {
  }

  async execute(useCase: UseCase): Promise<void> {
    const result = await this.repository.update(useCase.id, useCase);
    return result;
  }
}
