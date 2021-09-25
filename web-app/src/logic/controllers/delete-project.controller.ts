import { Controller } from '../../commons/services/types/controller';
import { ProjectRepository } from '../repositories/project.repository';
import {Id} from '../../commons/model/id';

export class DeleteProjectController implements Controller<Id, void> {

  constructor(private repository: ProjectRepository) {
  }

  async execute(id: Id): Promise<void> {
    return await this.repository.delete(id);
  }
}
