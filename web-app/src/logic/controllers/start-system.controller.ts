import { Controller } from '../../commons/services/types/controller';
import { ProjectRepository } from '../repositories/project.repository';
import { Project } from '../models/project';
import { ControllerResponse, ControllerResponseStatus } from "./types/controller-response";
import {AppError} from "./types/app-error";

export class StartSystemController implements Controller<null, ControllerResponse<Project>> {

  constructor(private repository: ProjectRepository) {
  }

  public async execute(): Promise<ControllerResponse<Project>> {
    try {
      const projects = await this.repository.getAll();
      return this.createSuccessResponse(projects);
    } catch (e) {
      return this.createFailResponse(e);
    }
  }

  private createSuccessResponse(projects): ControllerResponse<Project> {
    return {
      data: projects[0],
      status: ControllerResponseStatus.OK,
    } as ControllerResponse<Project>;
  }

  private createFailResponse(systemError: Error): ControllerResponse<Project> {
    let errorMessage = 'Error desconocido';
    if (systemError instanceof Error) {
      errorMessage = systemError.message;
    }
    return {
      data: null,
      status: ControllerResponseStatus.ERROR,
      error: { message: errorMessage } as AppError,
    } as  ControllerResponse<Project>;
  }
}
