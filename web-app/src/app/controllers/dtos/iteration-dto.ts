import {Id} from '../../../commons/model/id';
import {NotAssignedCostDto} from './not-assigned-cost-dto';
import {RealizationDto} from './realization-dto';



export interface IterationDto {

    id: Id;
    number: number;
    startDate: string;
    endDate: string;
    dateTimes: string[];
    notAssignedCosts: NotAssignedCostDto[];
    realizations: RealizationDto[];

}
