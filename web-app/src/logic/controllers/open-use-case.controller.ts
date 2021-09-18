import {UseCaseRepository} from '../repositories/use-case.repository';
import {UseCase} from '../models/use-case';
import {Controller} from '../../commons/services/types/controller';

export class OpenUseCaseController implements Controller<number, UseCase>{

  constructor(private repository: UseCaseRepository) {
  }

  async execute(id: number): Promise<UseCase> {
    return await this.repository.getOne(id);
  }

}
