import {Controller} from '../../commons/services/types/controller';
import {ProjectRepository} from '../repositories/project.repository';
import {Project} from '../models/project';
import {ViewModel} from "../../commons/services/types/view-model";
import {ControllerResponse, ControllerResponseStatus} from "./types/controller-response";
import { Command } from "../../commons/services/types/command";

export class StartSystemController implements Command {

  constructor(
    private repository: ProjectRepository,
    private viewModel: ViewModel<ControllerResponse<Project>>
  ) {
  }

  async execute() {
    const projects = await this.repository.getAll();

    if (projects[0] !== null) {
      const response: ControllerResponse<Project> = {
        status: ControllerResponseStatus.OK,
        data: projects[0],
      };
      this.viewModel.setValue(response);
    }
  }
}
