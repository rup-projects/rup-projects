import { Command } from '../domain/controllers/Command';
import { ProjectRepository } from '../repositories/project.repository';

export class DeleteProjectController implements Command<string> {

    constructor(
      private repository: ProjectRepository
      ) {}

    async execute(idProject: string): Promise<void> {
      const id: any = 'idproject';
      return await this.repository.delete(id);
    }
}
