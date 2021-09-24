import { Controller } from '../../commons/services/types/controller';
import {Project, ProjectRequest} from '../models/project';
import { ProjectRepository } from '../repositories/project.repository';

export class PlanProjectController implements Controller<ProjectRequest, Project> {

  constructor(private repository: ProjectRepository) {
  }

  async execute(param: ProjectRequest): Promise<Project> {
    const existentProjects = await this.repository.getAll();
    if (existentProjects.length > 0) {
      await this.repository.delete(existentProjects[0].id.toString());
    }
    const result = await this.repository.create(param);
    return result;
  }
}
