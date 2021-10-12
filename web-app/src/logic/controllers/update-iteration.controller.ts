import { Controller } from '../../commons/services/types/controller';
import {Iteration} from '../models/iteration';
import {IterationRepository} from '../repositories/iteration.repository';
import {ControllerResponse} from './core/types/controller-response';
import {ControllerResponseFactory} from './core/controller-response.factory';

export class UpdateIterationController implements Controller<Iteration, ControllerResponse<null>> {

  constructor(private repository: IterationRepository) {
  }

  async execute(iteration: Iteration): Promise<ControllerResponse<null>> {
    try {
      await this.repository.update(iteration.id, iteration);
      return ControllerResponseFactory.createSuccess(null);
    } catch (e) {
      ControllerResponseFactory.createFail(e);
    }
  }
}
