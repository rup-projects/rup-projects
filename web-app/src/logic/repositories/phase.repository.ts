import { GetAllDao} from '../../commons/services/base.dao';
import {Phase} from '../models/phase';
import {Iteration} from '../models/iteration';
import {Id} from '../../commons/model/id';

export interface PhaseRepository extends GetAllDao<Phase[]>{

  getIterations(id: Id): Promise<Iteration[]>;

}

