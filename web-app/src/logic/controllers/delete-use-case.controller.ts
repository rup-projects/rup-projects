import {UseCaseRepository} from '../repositories/use-case.repository';
import {Controller} from '../../commons/services/types/controller';
import {Id} from '../../commons/model/id';

export class DeleteUseCaseController implements Controller<number, void>{
    constructor(private repository: UseCaseRepository) {

    }

  async execute(id: Id): Promise<void> {
    return await this.repository.delete(id);
  }



}
