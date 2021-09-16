import { Command } from '../domain/controllers/Command';
import { ProjectRepository } from '../repositories/project.repository';
import { PlanProjectDto } from '../models/planProjectDto';

export class PlanProjectController implements Command<PlanProjectDto> {

    constructor(
      private repository: ProjectRepository
      ) {}

    async execute(param: PlanProjectDto): Promise<void> {
      const result = await this.repository.create(param);
    }
}
