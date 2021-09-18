import { Controller } from './types/controller';
import { ProjectRepository } from '../repositories/project.repository';

export class DeleteProjectController implements Controller<string, void> {

    constructor(
      private repository: ProjectRepository
      ) {}

    async execute(idProject: string): Promise<void> {
      const id: any = 'idproject';
      return await this.repository.delete(id);
    }
}
