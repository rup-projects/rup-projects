import { Injectable } from '@angular/core';
import { DeleteProjectController } from '../../logic/controllers/delete-project.controller';
import { StartSystemController } from '../../logic/controllers/start-system.controller';
import { Project, CreateProjectDto } from '../../logic/models/project';
import { ProjectRestRepository } from '../infrastructure/project-rest-repository';
import { InitProjectViewModel } from './view-models/init-project.view-model';
import { PrePlanProjectController } from '../../logic/controllers/pre-plan-project.controller';
import { PlanProjectController } from '../../logic/controllers/plan-project.controller';
import { Id } from '../../commons/model/id';
import { Observable } from 'rxjs';
import { ControllerResponse, ControllerResponseStatus } from '../../logic/controllers/types/controller-response';
import { ErrorViewModel } from '../../commons/services/view-models/error.view-model';

@Injectable()
export class ProjectService {

  constructor(
    private repository: ProjectRestRepository,
    private initProjectViewModel: InitProjectViewModel,
    private errorViewModel: ErrorViewModel,
  ) {}

  public getExistingPlannedProject$(): Observable<Project> {
    return this.initProjectViewModel.existingPlannedProject$;
  }

  public getPrePlannedProject$(): Observable<Project> {
    return this.initProjectViewModel.prePlannedProject$;
  }

  public getCompletedOperationPrePlanProject$(): Observable<boolean> {
    return this.initProjectViewModel.completedOperationPrePlanProject$;
  }

  public getCompletedOperationPlanProject$(): Observable<boolean> {
    return this.initProjectViewModel.completedOperationPlanProject$;
  }

  public async startSystem(): Promise<void> {
    const result = await new StartSystemController(this.repository).execute();
    if (result.status === ControllerResponseStatus.OK) {
      const existingPlannedProject = result.data;
      await this.initProjectViewModel.dispatchExitingPlannedProject(existingPlannedProject);
    } else {
      await this.errorViewModel.dispatchAppError(result.error);
    }
  }

  public async prePlanProject(createPrePlanProjectDto: CreateProjectDto): Promise<void> {
    const result = await new PrePlanProjectController(this.repository).execute(createPrePlanProjectDto);
    if (result.status === ControllerResponseStatus.OK && result.data) {
      const prePlannedProject = result.data;
      await this.initProjectViewModel.dispatchSuccefullResultPrePlanProject(prePlannedProject);
    } else {
      await this.errorViewModel.dispatchAppError(result.error);
    }
  }

  public async planProject(planProject: CreateProjectDto): Promise<void> {
    const controller = new PlanProjectController(this.repository);
    const result = await controller.execute(planProject);
    if (result.status === ControllerResponseStatus.OK) {
      await this.initProjectViewModel.dispatchSuccefullResultPlanProjectOperation();
    } else {
      await this.errorViewModel.dispatchAppError(result.error);
    }
  }

  public async deleteProject(id: Id): Promise<void> {
    const result = await new DeleteProjectController(this.repository).execute(id);
    if (result.status === ControllerResponseStatus.OK) {
      await this.initProjectViewModel.resetStore();
    } else {
      await this.errorViewModel.dispatchAppError(result.error);
    }
  }

}
