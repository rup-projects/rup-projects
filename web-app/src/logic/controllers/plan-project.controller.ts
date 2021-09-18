import { Controller } from './types/controller';
import { ProjectRepository } from '../repositories/project.repository';
import { PlanProjectDto } from '../models/planProjectDto';
import { Project } from '../models/project';

export class PlanProjectController implements Controller<PlanProjectDto, Project> {

    constructor(
      private repository: ProjectRepository,
      ) {}

    async execute(param: PlanProjectDto): Promise<Project> {
      const result = await this.repository.create(param);
      return result;
    }
}
