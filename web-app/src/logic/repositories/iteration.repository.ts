import {GetAllDao, GetOneDao, UpdateDao} from '../../commons/services/base.dao';
import {Iteration} from '../models/iteration';
import {Realization} from '../models/realization';

export interface IterationRepository extends GetOneDao<number, Iteration>, UpdateDao<number, Iteration, void> {

  getRealizations(id: number): Promise<Realization[]>;

}

