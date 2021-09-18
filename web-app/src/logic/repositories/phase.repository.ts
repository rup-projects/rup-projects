import { GetAllDao} from '../../commons/services/base.dao';
import {Phase} from '../models/phase';
import {Iteration} from '../models/iteration';

export interface PhaseRepository extends GetAllDao<Phase[]>{

  getIterations(id: number): Promise<Iteration[]>;

}

