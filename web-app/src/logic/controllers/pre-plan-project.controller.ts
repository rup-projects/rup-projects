import {ProjectRepositoryImpl} from '../../app/infrastructure/project-repository-impl.service';
import {PlanProject} from '../models/planProject';
import {Project} from '../models/project';

export class PrePlanProjectController {
    constructor(private repository: ProjectRepositoryImpl) {

    }

  async execute(param: PlanProject): Promise<Project> {
    const result = await this.repository.getPlanned(param);
    return result;
  }


}
