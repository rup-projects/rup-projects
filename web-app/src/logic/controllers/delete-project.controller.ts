import { Controller } from '../../commons/services/types/controller';
import { ProjectRepository } from '../repositories/project.repository';
import {Id} from '../../commons/model/id';
import { ControllerResponse, ControllerResponseStatus } from './types/controller-response';
import { Project } from '../models/project';
import { AppError } from './types/app-error';

export class DeleteProjectController implements Controller<Id, ControllerResponse<null>> {

  constructor(private repository: ProjectRepository) {
  }

  async execute(id: Id): Promise<ControllerResponse<null>> {
    try {
      /* TODO implementar getOne en el back para comprobar si existe el proyecto (Nunca borrar sin verificar)
      const existentProject = await this.repository.getOne(id);
      if (existentProject) {
        const projectId = existentProjects[0].id;
        await this.repository.delete(projectId);
      }*/
      await this.repository.delete(id);
      return this.createSuccessResponse();
    } catch (e) {
      return this.createFailResponse(e);
    }
  }

  private createSuccessResponse(): ControllerResponse<null> {
    return {
      data: null,
      status: ControllerResponseStatus.OK,
    } as  ControllerResponse<null>;
  }

  private createFailResponse(systemError: Error): ControllerResponse<null> {
    console.log('aqui4');
    console.log(typeof systemError);
    return {
      data: null,
      status: ControllerResponseStatus.ERROR,
      error: { message: systemError.message } as AppError,
    } as  ControllerResponse<null>;
  }
}
