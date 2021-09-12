import {Phase} from './phase';
import {Id} from '../../commons/model/id';

export class Project {

  constructor(
    public id: Id,
    public startDate: Date,
    public endDate: Date,
    public cost: number,
    public phases: Phase[],
    public iterationSize: number,
    public numberOfIterations: number,
  ) {
  }

}
