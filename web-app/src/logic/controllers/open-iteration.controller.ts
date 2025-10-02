import {IterationRepository} from '../repositories/iteration.repository';
import {Controller} from '../../commons/services/types/controller';
import {Iteration} from '../models/iteration';
import {Id} from '../../commons/model/id';
import {ControllerResponseFactory} from './core/controller-response.factory';
import {ControllerResponse} from './core/types/controller-response';

export class OpenIterationController implements Controller<Id, ControllerResponse<Iteration>>{
    constructor(private repository: IterationRepository) {

    }

  async execute(id: Id): Promise<ControllerResponse<Iteration>>{
    try {
      const result = await this.repository.getOne(id);
      return ControllerResponseFactory.createSuccess(result);
    } catch (e) {
      return ControllerResponseFactory.createFail(e);
    }
  }

}
