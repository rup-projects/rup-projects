import {IterationRepositoryImplService} from '../../app/infrastructure/iteration-repository-impl.service';
import {Realization} from '../models/realization';
import {Controller} from '../../commons/services/types/controller';

export class OpenRealizationByIterationController implements Controller<number, Realization[]>{
    constructor(private repository: IterationRepositoryImplService) {

    }

  async execute(id: number): Promise<Realization[]> {
    const result = await this.repository.getRealizations(id);
    return result;
  }


}
