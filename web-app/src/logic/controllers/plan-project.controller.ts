import { Controller } from '../../commons/services/types/controller';
import { Project } from '../models/project';
import { ProjectRepository } from '../repositories/project.repository';
import {PlanProject} from '../models/planProject';

export class PlanProjectController implements Controller<PlanProject, Project> {

  constructor(private repository: ProjectRepository) {
  }

  async execute(param: PlanProject): Promise<Project> {
    const existentProjects = await this.repository.getAll();
    if (existentProjects.length > 0) {
      await this.repository.delete(existentProjects[0].id.toString());
    }
    const result = await this.repository.create(param);
    return result;
  }
}
