import {Injectable} from '@angular/core';
import {ReadableViewModel} from '../../commons/services/types/readable-view-model';
import {DeleteProjectController} from '../../logic/controllers/delete-project.controller';
import {PlanProjectController} from '../../logic/controllers/plan-project.controller';
import {StartSystemController} from '../../logic/controllers/start-system.controller';
import {PlanProjectDto} from '../../logic/models/planProjectDto';
import {Project} from '../../logic/models/project';
import {ProjectRepositoryImpl} from '../infrastructure/project-repository-impl.service';
import {ProjectViewModel} from './view-models/project.view-model';
import {PrePlanProjectController} from '../../logic/controllers/pre-plan-project.controller';

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

  public async prePlanProject(planProjectDto: PlanProjectDto): Promise<void> {
    const project = await new PrePlanProjectController(this.repository).execute(planProjectDto);
    this.projectViewModel.setValue(project);
  }

  public async planProject(planProjectDto: PlanProjectDto): Promise<void> {
    const controller = new PlanProjectController(this.repository);
    const projectPlaned = await controller.execute(planProjectDto);
    this.projectViewModel.setValue(projectPlaned);
  }

  public async deleteProject(): Promise<void> {
    const idProject: any = 'idproject';
    const controller = new DeleteProjectController(this.repository);
    await controller.execute(idProject);
  }
}
