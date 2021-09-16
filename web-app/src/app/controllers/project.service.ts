import { Inject, Injectable } from '@angular/core';
import { ProjectRepository } from '../../logic/repositories/project.repository';
import {PlanProjectDto} from '../../logic/models/planProjectDto';
import { StartSystemController } from '../../logic/controllers/startSystem.controller';
import {PlanProjectController} from '../../logic/controllers/plan-project.controller';
import {DeleteProjectController} from '../../logic/controllers/delete-project.controller';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  constructor(@Inject('ProjectRepository') private repository: ProjectRepository) {}

  public async startSystem(): Promise<void> {
    const controller = new StartSystemController(this.repository);
    controller.execute();
  }


  public async planProject(project: PlanProjectDto): Promise<void> {
    const controller = new PlanProjectController(this.repository);
    controller.execute(project);
  }

  public async deleteProject(): Promise<void> {
    const idProject: any = 'idproject';
    const controller = new DeleteProjectController(this.repository);
    controller.execute(idProject);
  }

}
