import { Controller } from '../../commons/services/types/controller';
import { Project, CreateProjectDto } from '../models/project';
import { ProjectRepository } from '../repositories/project.repository';
import { ControllerResponse, ControllerResponseStatus } from './types/controller-response';
import { AppError } from './types/app-error';

export class PlanProjectController implements Controller<CreateProjectDto, ControllerResponse<Project>> {

  constructor(private repository: ProjectRepository) {}

  async execute(createProjectDto: CreateProjectDto): Promise<ControllerResponse<Project>> {
    try {
      const createdProject = await this.repository.create(createProjectDto);
      return this.createSuccessResponse(createdProject);
    } catch (e) {
      return this.createFailResponse(e);
    }
  }

  private createSuccessResponse(project: Project): ControllerResponse<Project> {
    return {
      data: project,
      status: ControllerResponseStatus.OK,
    } as  ControllerResponse<Project>;
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
