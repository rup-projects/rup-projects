import {UseCaseRepository} from '../repositories/use-case.repository';
import {UseCase} from '../models/use-case';
import {Controller} from '../../commons/services/types/controller';
import {Id} from '../../commons/model/id';
import {ControllerResponse} from './core/types/controller-response';
import {ControllerResponseFactory} from './core/controller-response.factory';

export class OpenUseCaseController implements Controller<Id, ControllerResponse<UseCase>>{

  constructor(private repository: UseCaseRepository) {
  }

  async execute(id: Id): Promise<ControllerResponse<UseCase>> {
    try {
      const usecase = await this.repository.getOne(id);
      return ControllerResponseFactory.createSuccess(usecase);;
    } catch (e) {
      return ControllerResponseFactory.createFail(e);
    }
  }

}
