import {IterationRepository} from '../repositories/iteration.repository';
import {Controller} from '../../commons/services/types/controller';
import {Iteration} from '../models/iteration';

export class OpenIterationController implements Controller<number, Iteration>{
    constructor(private repository: IterationRepository) {

    }

  async execute(id: number): Promise<Iteration>{
    const result = await this.repository.getOne(id);
    return result;
  }

}
