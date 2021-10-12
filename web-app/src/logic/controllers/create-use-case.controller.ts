import {UseCaseRepository} from '../repositories/use-case.repository';
import {UseCase, createUseCaseDto} from '../models/use-case';
import {Controller} from '../../commons/services/types/controller';
import {ControllerResponse} from './core/types/controller-response';
import {ControllerResponseFactory} from './core/controller-response.factory';

export class CreateUseCaseController implements Controller<createUseCaseDto, ControllerResponse<UseCase>>{
    constructor(private repository: UseCaseRepository) {

    }

  async execute(useCase: createUseCaseDto): Promise<ControllerResponse<null>> {
    try {
      await this.repository.create(useCase);
      return ControllerResponseFactory.createSuccess(null);
    } catch (e) {
      return ControllerResponseFactory.createFail(e);
    }
  }


}
