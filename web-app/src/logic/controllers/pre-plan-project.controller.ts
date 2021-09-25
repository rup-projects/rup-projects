import {ProjectRestRepository} from '../../app/infrastructure/project-repository-impl.service';
import {Project, ProjectRequest} from '../models/project';

export class PrePlanProjectController {
    constructor(private repository: ProjectRestRepository) {

    }

  async execute(projectRequest: ProjectRequest): Promise<Project> {
    const result = await this.repository.getPlanned(projectRequest);
    return result;
  }


}
