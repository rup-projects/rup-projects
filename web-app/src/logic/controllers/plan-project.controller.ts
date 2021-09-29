import {Project, CreateProjectDto} from '../models/project';
import { ProjectRepository } from '../repositories/project.repository';
import { ViewModel } from "../../commons/services/types/view-model";
import {ControllerResponse, ControllerResponseStatus} from "./types/controller-response";
import { Command } from "../../commons/services/types/command";

export class PlanProjectController implements Command {

  constructor(
    private repository: ProjectRepository,
    private viewModel: ViewModel<ControllerResponse<null>>
  ) {
  }

  async execute(projectRequest: CreateProjectDto): Promise<void> {
    const existentProjects = await this.repository.getAll();
    if (existentProjects.length > 0) {
      await this.repository.delete(existentProjects[0].id);
    }
    const result = await this.repository.create(projectRequest);
    let response: ControllerResponse<null> = {
      status: ControllerResponseStatus.OK,
      data: null,
    };
    if (!result) {
      response = {
        status: ControllerResponseStatus.ERROR,
        data: null,
        error: {
          message: 'Error en PlanProjectController'
        }
      };
    }
    this.viewModel.setValue(response);
  }
}
