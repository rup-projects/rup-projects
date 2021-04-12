import { Iteration } from './iteration';
import { PhaseType } from './phase-type.enum';

export class Phase {
  id: number;
  type: PhaseType;
  iterations: Iteration[];
  startDate: string;
  endDate: string;
  duration: number;
}
