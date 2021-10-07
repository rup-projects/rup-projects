import {ProjectRestRepository} from '../../app/infrastructure/project-rest-repository';
import {Project, CreateProjectDto} from '../models/project';
import {ControllerResponse, ControllerResponseStatus} from './core/types/controller-response';
import {AppError} from './core/types/app-error';
import { Controller } from '../../commons/services/types/controller';
import {Error} from '../../commons/model/error.model';

export class PrePlanProjectController implements Controller<CreateProjectDto, ControllerResponse<Project>>{
    constructor(private repository: ProjectRestRepository) {}

    async execute(projectRequest: CreateProjectDto): Promise<ControllerResponse<Project>> {
      try {
        const project = await this.repository.getPlanned(projectRequest);
        if (project) {
          return this.createSuccessResponse(project);
        } else {
          throw new Error('no project returned');
        }
      } catch (e) {
        return this.createFailResponse(e.message);
      }

    }

    private createSuccessResponse(project: Project): ControllerResponse<Project> {
      return {
        data: project,
        status: ControllerResponseStatus.OK,
      } as  ControllerResponse<Project>;
    }

    private createFailResponse(message: string): ControllerResponse<Project> {
      return {
        data: null,
        status: ControllerResponseStatus.ERROR,
        error: { message } as AppError,
      } as ControllerResponse<Project>;
    }

}
