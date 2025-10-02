import {UseCaseRepository} from '../repositories/use-case.repository';
import {Controller} from '../../commons/services/types/controller';
import {Id} from '../../commons/model/id';
import {ControllerResponse} from './core/types/controller-response';
import {ControllerResponseFactory} from './core/controller-response.factory';

export class DeleteUseCaseController implements Controller<Id, ControllerResponse<null>>{
    constructor(private repository: UseCaseRepository) {

    }

  async execute(id: Id): Promise<ControllerResponse<null>> {
    try {
      await this.repository.delete(id);
      return ControllerResponseFactory.createSuccess(null);
    } catch (e) {
      return ControllerResponseFactory.createFail(e);
    }
  }



}
