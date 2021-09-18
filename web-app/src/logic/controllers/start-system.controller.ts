import { Controller } from '../../commons/services/types/controller';
import { ProjectRepository } from '../repositories/project.repository';

export class StartSystemController implements Controller<null, void> {

  constructor(private repository: ProjectRepository) {
  }

  async execute(): Promise<void> {
    const result = await this.repository.getAll();
  }
}
