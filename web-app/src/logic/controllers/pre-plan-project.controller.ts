import {ProjectRestRepository} from '../../app/infrastructure/project-rest-repository';
import {CreateProjectDto, Project} from '../models/project';
import { Command } from "../../commons/services/types/command";
import { ViewModel } from "../../commons/services/types/view-model";
import { ControllerResponse, ControllerResponseStatus } from "./types/controller-response";

export class PrePlanProjectController implements Command {
    constructor(
      private repository: ProjectRestRepository,
      private viewModel: ViewModel<ControllerResponse<Project>>,
    ) {

    }

  async execute(projectRequest: CreateProjectDto): Promise<void> {
    const result = await this.repository.getPlanned(projectRequest);
    const response: ControllerResponse<Project> = {
      status: ControllerResponseStatus.OK,
      data: result
    };
    this.viewModel.setValue(response);
  }


}
