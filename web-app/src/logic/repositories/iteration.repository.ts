import {GetAllDao, GetOneDao, UpdateDao} from '../../commons/services/base.dao';
import {Iteration} from '../models/iteration';
import {Realization} from '../models/realization';
import {Id} from '../../commons/model/id';

export interface IterationRepository extends GetOneDao<Id, Iteration>, UpdateDao<Id, Iteration, void> {

  getRealizations(id: Id): Promise<Realization[]>;

}

