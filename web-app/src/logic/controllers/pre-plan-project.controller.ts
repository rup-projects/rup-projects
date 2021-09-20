import {ProjectRepositoryImpl} from '../../app/infrastructure/project-repository-impl.service';
import {PlanProjectDto} from '../models/planProjectDto';
import {Project} from '../models/project';

export class PrePlanProjectController {
    constructor(private repository: ProjectRepositoryImpl) {

    }

  async execute(param: PlanProjectDto): Promise<Project> {
    const result = await this.repository.getPlanned(param);
    return result;
  }


}
