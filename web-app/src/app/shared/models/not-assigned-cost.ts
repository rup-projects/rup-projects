import {DisciplineType} from './discipline.type';
import {Activity} from './activity';

export interface NotAssignedCost {
    id: number;
    disciplineType: DisciplineType;
    hours: number;
    notAssignedActivities: Activity[];
}


