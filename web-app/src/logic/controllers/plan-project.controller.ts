import { Controller } from '../../commons/services/types/controller';
import {Project, CreateProjectDto} from '../models/project';
import { ProjectRepository } from '../repositories/project.repository';

export class PlanProjectController implements Controller<CreateProjectDto, Project> {

  constructor(private repository: ProjectRepository) {
  }

  async execute(projectRequest: CreateProjectDto): Promise<Project> {
    const existentProjects = await this.repository.getAll();
    if (existentProjects.length > 0) {
      await this.repository.delete(existentProjects[0].id);
    }
    const result = await this.repository.create(projectRequest);
    return result;
  }
}
