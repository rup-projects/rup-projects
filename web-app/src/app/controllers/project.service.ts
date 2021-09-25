import {Injectable} from '@angular/core';
import {ReadableViewModel} from '../../commons/services/types/readable-view-model';
import {DeleteProjectController} from '../../logic/controllers/delete-project.controller';
import {StartSystemController} from '../../logic/controllers/start-system.controller';
import {Project, ProjectRequest} from '../../logic/models/project';
import {ProjectRepositoryImpl} from '../infrastructure/project-repository-impl.service';
import {ProjectViewModel} from './view-models/project.view-model';
import {PrePlanProjectController} from '../../logic/controllers/pre-plan-project.controller';
import {PlanProjectController} from '../../logic/controllers/plan-project.controller';
import {Id} from '../../commons/model/id';

@Injectable()
export class ProjectService {

  constructor(
    private repository: ProjectRepositoryImpl,
    private projectViewModel: ProjectViewModel
  ) {
  }

  public getViewModel(): ReadableViewModel<Project> {
    return this.projectViewModel;
  }

  public async startSystem(): Promise<void> {
    const project = await new StartSystemController(this.repository).execute();
    if (project !== null) {
      this.projectViewModel.setValue(project);
    }
  }

  public async prePlanProject(planProject: ProjectRequest): Promise<void> {
    const project = await new PrePlanProjectController(this.repository).execute(planProject);
    this.projectViewModel.setValue(project);
  }

  public async planProject(planProject: ProjectRequest): Promise<void> {
    const controller = new PlanProjectController(this.repository);
    const projectPlaned = await controller.execute(planProject);
    this.projectViewModel.setValue(projectPlaned);
  }

  public async deleteProject(id: Id): Promise<void> {
    const controller = new DeleteProjectController(this.repository);
    await controller.execute(id);
  }
}
