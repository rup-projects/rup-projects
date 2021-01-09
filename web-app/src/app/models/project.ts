import { Phase } from './phase';

export class Project {

  id: number;
  startDate: Date;
  endDate: Date;
  cost: number;
  phases: Phase[];
  iterationSize: number;
  numberOfIterations: number;
  
}
