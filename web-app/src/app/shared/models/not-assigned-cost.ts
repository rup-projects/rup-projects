import {Activity} from './activity';
import {DisciplineType} from '../types/discipline-type';

export interface NotAssignedCost {
    id: number;
    type: DisciplineType;
    hours: number;
    notAssignedActivities: Activity[];
}


