import {Activity} from './activity';
import {DisciplineType} from '../../app/core/services/dtos/discipline-type';

export interface NotAssignedCost {
    id: number;
    type: DisciplineType;
    hours: number;
    notAssignedActivities: Activity[];
}


