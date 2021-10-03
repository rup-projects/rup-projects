import {ProjectRestRepository} from '../../app/infrastructure/project-rest-repository';
import {Project, CreateProjectDto} from '../models/project';
import {ControllerResponse, ControllerResponseStatus} from "./types/controller-response";
import {AppError} from "./types/app-error";

export class PrePlanProjectController {
    constructor(private repository: ProjectRestRepository) {}

    async execute(projectRequest: CreateProjectDto): Promise<ControllerResponse<Project>> {
      try {
        const project = await this.repository.getPlanned(projectRequest);
        return this.createSuccessResponse(project);
      } catch (e) {
        return this.createFailResponse(e);
      }

    }

    private createSuccessResponse(project) {
      return {
        data: project,
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
