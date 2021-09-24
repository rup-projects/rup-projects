import {Id} from '../../../commons/model/id';
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

export type planProject = Pick<ProjectDto, 'startDate' | 'endDate' | 'cost' | 'numberOfIterations'>;

