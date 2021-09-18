import { Command } from './types/command';
import { ProjectRepository } from '../repositories/project.repository';

export class StartSystemController implements Command<null, void> {

    constructor(
      private repository: ProjectRepository
      ) {}

    async execute(): Promise<void> {
      const result = await this.repository.getAll();
    }
}
