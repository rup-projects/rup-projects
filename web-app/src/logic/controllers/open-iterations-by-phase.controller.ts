import { Iteration } from '../models/iteration';
import { Controller } from '../../commons/services/types/controller';
import { PhaseRepository } from '../repositories/phase.repository';
import { Id } from '../../commons/model/id';
import { ControllerResponseFactory } from './core/controller-response.factory';
import { ControllerResponse } from './core/types/controller-response';

export class OpenIterationsByPhaseController implements Controller<Id, ControllerResponse<Iteration[]>>{

  constructor(private repository: PhaseRepository) {}

  async execute(id: Id): Promise<ControllerResponse<Iteration[]>> {
    try {
      const iterations = await this.repository.getIterations(id);
      return ControllerResponseFactory.createSuccess(iterations);
    } catch (e) {
      return ControllerResponseFactory.createFail(e);
    }
  }

}
