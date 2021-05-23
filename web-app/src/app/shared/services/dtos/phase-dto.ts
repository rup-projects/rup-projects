import {Id} from '../../types/id';
import {IterationDto} from './iteration-dto';
import {PhaseType} from '../../types/phase-type';


export interface PhaseDto {
  id: Id;
  type: PhaseType;
  iterations: IterationDto[];
  startDate: string;
  endDate: string;
  duration: number;
}
