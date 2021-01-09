import { Iteration } from './iteration';
import { PhaseType } from './phase-type.enum';

export class Phase {
  type: PhaseType;
  iterations: Iteration;
  startDate: Date;
  endDate: Date;
}
