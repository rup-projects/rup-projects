import { Controller } from '../../commons/services/types/controller';
import { ProjectRepository } from '../repositories/project.repository';
import {Project} from '../models/project';

export class StartSystemController implements Controller<null, Project> {

  constructor(private repository: ProjectRepository) {
  }

  async execute(): Promise<Project> {
    const projects = await this.repository.getAll();
    return projects[0];
  }
}
