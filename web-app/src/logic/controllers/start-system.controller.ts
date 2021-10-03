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

  private createSuccessResponse(projects) {
    return {
      data: projects[0],
      status: ControllerResponseStatus.OK,
    } as  ControllerResponse<Project>;
  }

  private createFailResponse(systemError: Error) {
    return {
      data: null,
      status: ControllerResponseStatus.ERROR,
      error: { message: systemError.message } as AppError,
    } as  ControllerResponse<Project>;

  }
}
