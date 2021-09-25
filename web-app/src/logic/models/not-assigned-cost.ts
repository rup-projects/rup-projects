import {Activity} from './activity';
import {DisciplineType} from './discipline-type';
import {Id} from '../../commons/model/id';

export interface NotAssignedCost {
    id: Id;
    type: DisciplineType;
    hours: number;
    notAssignedActivities: Activity[];
}


