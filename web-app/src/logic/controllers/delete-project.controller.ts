import {Controller} from '../../commons/services/types/controller';
import {ProjectRepository} from '../repositories/project.repository';
import {Id} from '../../commons/model/id';
import {ViewModel} from "../../commons/services/types/view-model";
import {ControllerResponse, ControllerResponseStatus} from "./types/controller-response";

export class DeleteProjectController implements Controller<Id, void> {

  constructor(private repository: ProjectRepository, private viewModel: ViewModel<ControllerResponse<null>>) {
  }

  async execute(id: Id): Promise<void> {
    await this.repository.delete(id);
    const response: ControllerResponse<null> = {
      status: ControllerResponseStatus.OK,
      data: null,
    }
    this.viewModel.setValue(response);
  }
}
