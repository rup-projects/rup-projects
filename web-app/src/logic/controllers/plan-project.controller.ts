import { Controller } from '../../commons/services/types/controller';
import { Project, CreateProjectDto } from '../models/project';
import { ProjectRepository } from '../repositories/project.repository';
import { ControllerResponse, ControllerResponseStatus } from './types/controller-response';
import { AppError } from './types/app-error';

export class PlanProjectController implements Controller<CreateProjectDto, ControllerResponse<Project>> {

  constructor(private repository: ProjectRepository) {}

  async execute(createProjectDto: CreateProjectDto): Promise<ControllerResponse<Project>> {

    try {
      const existentProjects = await this.repository.getAll();
      if (existentProjects.length > 0) {
        const projectId = existentProjects[0].id;
        await this.repository.delete(projectId);
      }
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
    console.log('aqui');
    console.log(typeof systemError);
    return {
      data: null,
      status: ControllerResponseStatus.ERROR,
      error: { message: systemError.message } as AppError,
    } as  ControllerResponse<Project>;
  }
}
