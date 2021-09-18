import {Controller} from '../../commons/services/types/controller';
import {UseCase} from '../models/use-case';
import {UseCaseRepository} from '../repositories/use-case.repository';

export class OpenUseCasesController implements Controller<void, UseCase[]> {

  constructor(private repository: UseCaseRepository) {
  }

  async execute(): Promise<UseCase[]> {
    return await this.repository.getAll();
  }
}
