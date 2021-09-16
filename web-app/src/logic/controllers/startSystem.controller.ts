import { Command } from '../domain/controllers/Command';
import { ProjectRepository } from '../repositories/project.repository';

export class StartSystemController implements Command<null> {

    constructor(
      private repository: ProjectRepository
      ) {}

    async execute(): Promise<void> {
      const result = await this.repository.getAll();
    }
}
