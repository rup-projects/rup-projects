import {UseCaseRepository} from '../repositories/use-case.repository';
import {UseCase} from '../models/use-case';

export class OpenUseCaseController {

  constructor(private repository: UseCaseRepository) {
  }

  async execute(id: number): Promise<UseCase> {
    return await this.repository.getOne(id);
  }

}
