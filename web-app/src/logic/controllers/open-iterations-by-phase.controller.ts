import {Iteration} from '../models/iteration';
import {Controller} from '../../commons/services/types/controller';
import {PhaseRepository} from '../repositories/phase.repository';

export class OpenIterationsByPhaseController implements Controller<number, Iteration[]>{


  constructor(private repository: PhaseRepository) {

  }

  async execute(id: number): Promise<Iteration[]> {
    const result = await this.repository.getIterations(id);
    return result;
  }

}
