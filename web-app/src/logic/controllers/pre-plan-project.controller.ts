import {ProjectRepositoryImpl} from '../../app/infrastructure/project-repository-impl.service';
import {Project, ProjectRequest} from '../models/project';

export class PrePlanProjectController {
    constructor(private repository: ProjectRepositoryImpl) {

    }

  async execute(param: ProjectRequest): Promise<Project> {
    const result = await this.repository.getPlanned(param);
    return result;
  }


}
