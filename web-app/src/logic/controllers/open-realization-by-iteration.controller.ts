import {IterationRepositoryImplService} from '../../app/infrastructure/iteration-repository-impl.service';
import {Realization} from '../models/realization';
import {Controller} from '../../commons/services/types/controller';
import {Id} from '../../commons/model/id';

export class OpenRealizationByIterationController implements Controller<number, Realization[]>{
    constructor(private repository: IterationRepositoryImplService) {

    }

  async execute(id: Id): Promise<Realization[]> {
    const result = await this.repository.getRealizations(id);
    return result;
  }


}
