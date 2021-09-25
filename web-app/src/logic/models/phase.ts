import { Iteration } from './iteration';
import {PhaseType} from './phase-type';
import {Id} from '../../commons/model/id';

export class Phase {
  id: Id;
  type: PhaseType;
  iterations: Iteration[];
  startDate: Date;
  endDate: Date;
  duration: number;
}
