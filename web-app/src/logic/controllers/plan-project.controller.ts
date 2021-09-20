import { Controller } from '../../commons/services/types/controller';
import { PlanProjectDto } from '../models/planProjectDto';
import { Project } from '../models/project';
import { ProjectRepository } from '../repositories/project.repository';

export class PlanProjectController implements Controller<PlanProjectDto, Project> {

  constructor(private repository: ProjectRepository) {
  }

  async execute(param: PlanProjectDto): Promise<Project> {
    const existentProjects = await this.repository.getAll();
    if (existentProjects.length > 0) {
      await this.repository.delete(existentProjects[0].id.toString());
    }
    const result = await this.repository.create(param);
    return result;
  }
}
