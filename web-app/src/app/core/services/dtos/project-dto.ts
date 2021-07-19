import {Id} from '../../types/id';
import {PhaseDto} from './phase-dto';


export interface ProjectDto {

  id: Id;
  startDate: string;
  endDate: string;
  cost: number;
  phases: PhaseDto[];
  iterationSize: number;
  numberOfIterations: number;

}

export type PlanProjectDto = Pick<ProjectDto, 'startDate' | 'endDate' | 'cost' | 'numberOfIterations'>;

