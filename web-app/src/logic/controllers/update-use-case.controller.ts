import {UseCaseRepository} from '../repositories/use-case.repository';
import {UseCase} from '../models/use-case';
import {Controller} from '../../commons/services/types/controller';
import {ControllerResponse} from './core/types/controller-response';
import {ControllerResponseFactory} from './core/controller-response.factory';

export class UpdateUseCaseController implements Controller<UseCase, ControllerResponse<null>>{
  constructor(private repository: UseCaseRepository)  {
  }

  async execute(useCase: UseCase): Promise<ControllerResponse<null>> {
    try {
      await this.repository.update(useCase.id, useCase);
      return ControllerResponseFactory.createSuccess(null);
    } catch (e) {
      return ControllerResponseFactory.createFail(e);
    }
  }
}
