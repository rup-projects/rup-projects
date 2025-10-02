import {ProjectRestRepository} from '../../app/infrastructure/project-rest-repository';
import {Project, CreateProjectDto} from '../models/project';
import {ControllerResponse, ControllerResponseStatus} from './core/types/controller-response';
import { Controller } from '../../commons/services/types/controller';
import {Error} from '../../commons/model/error.model';
import {ControllerResponseFactory} from './core/controller-response.factory';

export class PrePlanProjectController implements Controller<CreateProjectDto, ControllerResponse<Project>>{
    constructor(private repository: ProjectRestRepository) {}

    async execute(projectRequest: CreateProjectDto): Promise<ControllerResponse<Project>> {
      try {
        const project = await this.repository.getPlanned(projectRequest);
        if (project) {
          return ControllerResponseFactory.createSuccess(project);
        } else {
          throw new Error('no project returned');
        }
      } catch (e) {
        return ControllerResponseFactory.createFail(e);
      }
    }

}
