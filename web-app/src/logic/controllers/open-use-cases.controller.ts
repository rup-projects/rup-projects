import {Controller} from '../../commons/services/types/controller';
import {UseCase} from '../models/use-case';
import {UseCaseRepository} from '../repositories/use-case.repository';
import {ControllerResponseFactory} from './core/controller-response.factory';
import {ControllerResponse} from './core/types/controller-response';

export class OpenUseCasesController implements Controller<void, ControllerResponse<UseCase[]>> {

  constructor(private repository: UseCaseRepository) {
  }

  async execute(): Promise<ControllerResponse<UseCase[]>> {
    try {
      const useCases = await this.repository.getAll();
      return ControllerResponseFactory.createSuccess(useCases);
    } catch (e) {
      return ControllerResponseFactory.createFail(e);
    }
  }
}
