import { Controller } from '../../commons/services/types/controller';
import { ProjectRepository } from '../repositories/project.repository';
import {Id} from '../../commons/model/id';
import { ControllerResponse} from './core/types/controller-response';
import {ControllerResponseFactory} from './core/controller-response.factory';

export class DeleteProjectController implements Controller<Id, ControllerResponse<null>> {

  constructor(private repository: ProjectRepository) {
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
