import {NotAssignedCost} from './not-assigned-cost';
import {Realization} from './realization';



export interface Iteration {

    id: number;
    number: number;
    startDate: Date;
    endDate: Date;
    dateTimes?: Date[];
    notAssignedCosts: NotAssignedCost[];
    realizations: Realization[];

}
