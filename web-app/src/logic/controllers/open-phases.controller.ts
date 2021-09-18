import {PhaseRepository} from '../repositories/phase.repository';
import {Phase} from '../models/phase';
import {Controller} from '../../commons/services/types/controller';

export class OpenPhasesController implements Controller<void, Phase[]>{
    constructor(private repository: PhaseRepository)  {

    }

  async execute(): Promise<Phase[]> {
    return await this.repository.getAll();
  }


}
