import {ProjectRestRepository} from '../../app/infrastructure/project-rest-repository';
import {Project, CreateProjectDto} from '../models/project';

export class PrePlanProjectController {
    constructor(private repository: ProjectRestRepository) {

    }

  async execute(projectRequest: CreateProjectDto): Promise<Project> {
    const result = await this.repository.getPlanned(projectRequest);
    return result;
  }


}
