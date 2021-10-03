import {Injectable} from '@angular/core';
import {ReadableViewModel} from '../../commons/services/types/readable-view-model';
import {DeleteProjectController} from '../../logic/controllers/delete-project.controller';
import {StartSystemController} from '../../logic/controllers/start-system.controller';
import {Project, CreateProjectDto} from '../../logic/models/project';
import {ProjectRestRepository} from '../infrastructure/project-rest-repository';
import {InitProjectViewModel} from './view-models/init-project.view-model';
import {PrePlanProjectController} from '../../logic/controllers/pre-plan-project.controller';
import {PlanProjectController} from '../../logic/controllers/plan-project.controller';
import {Id} from '../../commons/model/id';
import {Observable} from "rxjs";
import {ControllerResponseStatus} from "../../logic/controllers/types/controller-response";
import {ErrorViewModel} from "../../commons/services/view-models/error.view-model";

@Injectable()
export class ProjectService {

  constructor(
    private repository: ProjectRestRepository,
    private projectViewModel: InitProjectViewModel,
    private errorViewModel: ErrorViewModel,
  ) {}

  public getProject$(): Observable<Project> {
    return this.projectViewModel.project$;
  }

  public async startSystem(): Promise<void> {
    const result = await new StartSystemController(this.repository).execute();
    if (result.status === ControllerResponseStatus.OK) {
      await this.projectViewModel.dispatchProject(result.data);
    } else {
      await this.errorViewModel.dispatchAppError(result.error);
    }
  }

  public async prePlanProject(planProject: CreateProjectDto): Promise<void> {
    const result = await new PrePlanProjectController(this.repository).execute(planProject);
    if (result.status === ControllerResponseStatus.OK) {
      await this.projectViewModel.dispatchProject(result.data);
    } else {
      await this.errorViewModel.dispatchAppError(result.error);
    }
  }

  public async planProject(planProject: CreateProjectDto): Promise<void> {
    const controller = new PlanProjectController(this.repository);
    const projectPlaned = await controller.execute(planProject);
    await this.projectViewModel.dispatchProject(projectPlaned);
  }

  public async deleteProject(id: Id): Promise<void> {
    await new DeleteProjectController(this.repository).execute(id);
    await this.projectViewModel.dispatchProject(null);
  }
}
