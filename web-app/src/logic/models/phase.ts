import { Iteration } from './iteration';
import {PhaseType} from '../../app/controllers/dtos/phase-type';

export class Phase {
  id: number;
  type: PhaseType;
  iterations: Iteration[];
  startDate: Date;
  endDate: Date;
  duration: number;
}
