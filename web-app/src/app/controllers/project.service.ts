import {Injectable} from '@angular/core';
import {ReadableViewModel} from '../../commons/services/types/readable-view-model';
import {DeleteProjectController} from '../../logic/controllers/delete-project.controller';
import {StartSystemController} from '../../logic/controllers/start-system.controller';
import {Project, CreateProjectDto} from '../../logic/models/project';
import {ProjectRestRepository} from '../infrastructure/project-rest-repository';
import {PrePlanProjectController} from '../../logic/controllers/pre-plan-project.controller';
import {PlanProjectController} from '../../logic/controllers/plan-project.controller';
import {Id} from '../../commons/model/id';
import { ProjectViewModel } from "./view-models/project.view-model";
import {ControllerResponse} from "../../logic/controllers/types/controller-response";

@Injectable()
export class ProjectService {

  constructor(
    private repository: ProjectRestRepository,
    private projectViewModel: ProjectViewModel
  ) {
  }

  public getViewModel(): ReadableViewModel<ControllerResponse<Project>> {
    return this.projectViewModel;
  }

  public async startSystem(): Promise<void> {
    await new StartSystemController(this.repository, this.projectViewModel).execute();
  }

  public async prePlanProject(planProject: CreateProjectDto): Promise<void> {
    await new PrePlanProjectController(this.repository, this.projectViewModel).execute(planProject);
  }

  public async planProject(planProject: CreateProjectDto): Promise<void> {
    const controller = new PlanProjectController(this.repository, this.projectViewModel);
    await controller.execute(planProject);
  }

  public async deleteProject(id: Id): Promise<void> {
    const controller = new DeleteProjectController(this.repository, this.projectViewModel);
    await controller.execute(id);
  }
}
