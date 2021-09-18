import { Controller } from '../../commons/services/types/controller';
import {Iteration} from '../models/iteration';
import {IterationRepository} from '../repositories/iteration.repository';

export class UpdateIterationController implements Controller<Iteration, void> {

  constructor(private repository: IterationRepository) {
  }

  async execute(iteration: Iteration): Promise<void> {
    const result = await this.repository.update(iteration.id, iteration);
    return result;
  }
}
