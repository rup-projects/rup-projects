import {IterationRestRepository} from '../../app/infrastructure/iteration-rest-repository';
import {Realization} from '../models/realization';
import {Controller} from '../../commons/services/types/controller';
import {Id} from '../../commons/model/id';
import {ControllerResponse} from './core/types/controller-response';
import {ControllerResponseFactory} from './core/controller-response.factory';

export class OpenRealizationByIterationController implements Controller<Id, ControllerResponse<Realization[]>>{
    constructor(private repository: IterationRestRepository) {}

  async execute(id: Id): Promise<ControllerResponse<Realization[]>> {
    try {
      const result = await this.repository.getRealizations(id);
      return ControllerResponseFactory.createSuccess(result);
    } catch (e) {
      return ControllerResponseFactory.createFail(e);
    }
  }


}
