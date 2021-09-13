import {ActivityDto} from './activity-dto';
import {DisciplineType} from './discipline-type';

export interface NotAssignedCostDto {
    id: number;
    type: DisciplineType;
    hours: number;
    notAssignedActivities: ActivityDto[];
}
