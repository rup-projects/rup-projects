import {UseCaseRepository} from '../repositories/use-case.repository';
import {Controller} from '../../commons/services/types/controller';

export class DeleteUseCaseController implements Controller<number, void>{
    constructor(private repository: UseCaseRepository) {

    }

  async execute(id: number): Promise<void> {
    return await this.repository.delete(id);
  }



}
