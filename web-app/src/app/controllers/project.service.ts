import { Inject, Injectable } from '@angular/core';
import { StartSystemController } from '../../logic/controllers/start-system.controller';
import { PlanProjectDto } from '../../logic/models/planProjectDto';
import { PlanProjectController } from '../../logic/controllers/plan-project.controller';
import { DeleteProjectController } from '../../logic/controllers/delete-project.controller';
import { ProjectRepositoryImpl } from '../infrastructure/project-repository-impl.service';
import { ProjectViewModel } from './view-models/project-view-model';
import { Project } from '../../logic/models/project';
import { ReadableViewModel } from '../../commons/services/types/readable-view-model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  constructor(
    private repository: ProjectRepositoryImpl,
    private projectViewModel: ProjectViewModel
    ) {}

  public getViewModel(): ReadableViewModel<Project> {
    return this.projectViewModel;
  }

  public async startSystem(): Promise<void> {
    const controller = new StartSystemController(this.repository);
    await controller.execute();
  }

  public async planProject(planProjectDto: PlanProjectDto): Promise<void> {
    const controller = new PlanProjectController(this.repository);
    const projectPLaned = await controller.execute(planProjectDto);
    this.projectViewModel.setValue(projectPLaned);
  }

  public async deleteProject(): Promise<void> {
    const idProject: any = 'idproject';
    const controller = new DeleteProjectController(this.repository);
    await controller.execute(idProject);
  }
}
