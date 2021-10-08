import { Controller } from '../../commons/services/types/controller';
import { Project, CreateProjectDto } from '../models/project';
import { ProjectRepository } from '../repositories/project.repository';
import { ControllerResponse, ControllerResponseStatus } from './core/types/controller-response';
import {ControllerResponseFactory} from './core/controller-response.factory';

export class PlanProjectController implements Controller<CreateProjectDto, ControllerResponse<Project>> {

  constructor(private repository: ProjectRepository) {}

  async execute(createProjectDto: CreateProjectDto): Promise<ControllerResponse<Project>> {
    try {
      const createdProject = await this.repository.create(createProjectDto);
      return this.createSuccessResponse(createdProject);
    } catch (e) {
      return ControllerResponseFactory.createFail(e);
    }
  }

  private createSuccessResponse(project: Project): ControllerResponse<Project> {
    return {
      data: project,
      status: ControllerResponseStatus.OK,
    } as  ControllerResponse<Project>;
  }
}
