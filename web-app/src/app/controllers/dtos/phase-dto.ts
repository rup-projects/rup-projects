import {Id} from '../../../commons/model/id';
import {IterationDto} from './iteration-dto';
import {PhaseType} from './phase-type';


export interface PhaseDto {
  id: Id;
  type: PhaseType;
  iterations: IterationDto[];
  startDate: string;
  endDate: string;
  duration: number;
}
