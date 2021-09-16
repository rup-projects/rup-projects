/*import { ProjectRepository } from '../repositories/project.repository';
import { PlanProjectDto } from '../models/planProjectDto';
import { Project } from '../models/project';


export class ProjectController {

  constructor(private repository: ProjectRepository) {
  }

  public async startSystem(): Promise<Project> {
    return await this.repository.getAll();
  }

  public async planProject(project: PlanProjectDto): Promise<Project> {
    return await this.repository.create(project);
  }

  public async deleteProject(): Promise<void> {
    const id: any = 'idproject';
    return await this.repository.delete(id);
  }

}
*/
