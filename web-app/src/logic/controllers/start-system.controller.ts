import { Controller } from '../../commons/services/types/controller';
import { ProjectRepository } from '../repositories/project.repository';
import { Project } from '../models/project';
import { ControllerResponse } from './core/types/controller-response';
import { ControllerResponseFactory } from './core/controller-response.factory';

export class StartSystemController implements Controller<null, ControllerResponse<Project>> {

  constructor(private repository: ProjectRepository) {
  }

  public async execute(): Promise<ControllerResponse<Project>> {
    try {
      const projects = await this.repository.getAll();
      if (projects.length !== 0) {
        return ControllerResponseFactory.createSuccess(projects[0]);
      } else {
        return ControllerResponseFactory.createSuccess(null);
      }
    } catch (e) {
      return ControllerResponseFactory.createFail(e);
    }
  }

}
