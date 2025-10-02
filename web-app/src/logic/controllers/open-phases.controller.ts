import {PhaseRepository} from '../repositories/phase.repository';
import {Phase} from '../models/phase';
import {Controller} from '../../commons/services/types/controller';
import { ControllerResponseFactory } from './core/controller-response.factory';
import { ControllerResponse } from './core/types/controller-response';
import { Project } from '../models/project';

export class OpenPhasesController implements Controller<void, ControllerResponse<Phase[]>>{

  constructor(private repository: PhaseRepository)  {}

  async execute(): Promise<ControllerResponse<Phase[]>> {
    try {
      const phases = await this.repository.getAll();
      return ControllerResponseFactory.createSuccess(phases);
    } catch (e) {
      return ControllerResponseFactory.createFail(e);
    }

  }


}
